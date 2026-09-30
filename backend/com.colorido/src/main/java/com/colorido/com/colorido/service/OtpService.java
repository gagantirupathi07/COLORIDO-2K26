package com.colorido.com.colorido.service;

import com.colorido.com.colorido.dto.auth.RegisterRequest;
import com.colorido.com.colorido.entity.OtpPurpose;
import com.colorido.com.colorido.entity.OtpVerification;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.OtpVerificationRepository;
import com.colorido.com.colorido.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${colorido.otp.expiration-minutes:10}")
    private long expirationMinutes;

    @Value("${colorido.otp.max-attempts:5}")
    private int maxAttempts;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Transactional
    public void sendRegistrationOtp(RegisterRequest request) {

        String email = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists."
            );
        }

        otpRepository.deleteByEmailAndPurpose(
                email,
                OtpPurpose.REGISTRATION
        );

        String otp = generateOtp();

        OtpVerification verification = OtpVerification.builder()
                .email(email)
                .otpHash(passwordEncoder.encode(otp))
                .purpose(OtpPurpose.REGISTRATION)
                .expiresAt(
                        LocalDateTime.now()
                                .plusMinutes(expirationMinutes)
                )
                .attempts(0)
                .verified(false)
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .college(request.getCollege())
                .year(request.getYear())
                .encodedPassword(
                        passwordEncoder.encode(request.getPassword())
                )
                .build();

        otpRepository.save(verification);

        sendOtpEmail(
                email,
                otp,
                "COLORIDO 2K26 - Verify Your Account"
        );
    }

    @Transactional
    public User verifyRegistrationOtp(
            String email,
            String otp
    ) {

        email = normalizeEmail(email);

        OtpVerification verification =
                otpRepository
                        .findTopByEmailAndPurposeAndVerifiedFalseOrderByCreatedAtDesc(
                                email,
                                OtpPurpose.REGISTRATION
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "No active registration OTP found."
                                )
                        );

        validateOtp(verification, otp);

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists."
            );
        }

        User user = User.builder()
                .fullName(verification.getFullName())
                .email(verification.getEmail())
                .password(verification.getEncodedPassword())
                .phone(verification.getPhone())
                .college(verification.getCollege())
                .year(verification.getYear())
                .role(User.Role.USER)
                .enabled(true)
                .build();

        user = userRepository.save(user);

        verification.setVerified(true);
        otpRepository.save(verification);

        return user;
    }

    @Transactional
    public void sendForgotPasswordOtp(String email) {

        email = normalizeEmail(email);

        otpRepository.deleteByEmailAndPurpose(
                email,
                OtpPurpose.FORGOT_PASSWORD
        );

        /*
         * Generic behavior:
         * don't reveal whether the email exists.
         */
        if (!userRepository.existsByEmail(email)) {
            return;
        }

        String otp = generateOtp();

        OtpVerification verification = OtpVerification.builder()
                .email(email)
                .otpHash(passwordEncoder.encode(otp))
                .purpose(OtpPurpose.FORGOT_PASSWORD)
                .expiresAt(
                        LocalDateTime.now()
                                .plusMinutes(expirationMinutes)
                )
                .attempts(0)
                .verified(false)
                .build();

        otpRepository.save(verification);

        sendOtpEmail(
                email,
                otp,
                "COLORIDO 2K26 - Password Reset OTP"
        );
    }

    @Transactional
    public void resetPassword(
            String email,
            String otp,
            String newPassword
    ) {

        email = normalizeEmail(email);

        if (newPassword == null || newPassword.length() < 8) {
            throw new IllegalArgumentException(
                    "Password must contain at least 8 characters."
            );
        }

        OtpVerification verification =
                otpRepository
                        .findTopByEmailAndPurposeAndVerifiedFalseOrderByCreatedAtDesc(
                                email,
                                OtpPurpose.FORGOT_PASSWORD
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "No active password reset OTP found."
                                )
                        );

        validateOtp(verification, otp);

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found."
                        )
                );

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

        verification.setVerified(true);
        otpRepository.save(verification);
    }

    private void validateOtp(
            OtpVerification verification,
            String otp
    ) {

        if (verification.isVerified()) {
            throw new IllegalArgumentException(
                    "This OTP has already been used."
            );
        }

        if (LocalDateTime.now()
                .isAfter(verification.getExpiresAt())) {

            throw new IllegalArgumentException(
                    "OTP has expired."
            );
        }

        if (verification.getAttempts() >= maxAttempts) {
            throw new IllegalArgumentException(
                    "Maximum OTP attempts exceeded."
            );
        }

        if (otp == null || otp.length() != 6) {

            verification.setAttempts(
                    verification.getAttempts() + 1
            );

            otpRepository.save(verification);

            throw new IllegalArgumentException(
                    "Invalid OTP."
            );
        }

        if (!passwordEncoder.matches(
                otp,
                verification.getOtpHash()
        )) {

            verification.setAttempts(
                    verification.getAttempts() + 1
            );

            otpRepository.save(verification);

            throw new IllegalArgumentException(
                    "Invalid OTP."
            );
        }
    }

    private String generateOtp() {

        return String.format(
                "%06d",
                ThreadLocalRandom.current()
                        .nextInt(0, 1_000_000)
        );
    }

    private void sendOtpEmail(
            String email,
            String otp,
            String subject
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(mailUsername);
        message.setTo(email);
        message.setSubject(subject);

        message.setText(
                "Hello,\n\n" +
                        "Your COLORIDO 2K26 verification OTP is:\n\n" +
                        otp +
                        "\n\n" +
                        "This OTP is valid for " +
                        expirationMinutes +
                        " minutes.\n\n" +
                        "Do not share this OTP with anyone.\n\n" +
                        "Regards,\n" +
                        "COLORIDO 2K26 Team"
        );

        mailSender.send(message);
    }

    private String normalizeEmail(String email) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException(
                    "Email is required."
            );
        }

        return email.trim().toLowerCase();
    }
}