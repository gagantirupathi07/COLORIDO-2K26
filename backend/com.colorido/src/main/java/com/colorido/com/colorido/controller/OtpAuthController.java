package com.colorido.com.colorido.controller;

import com.colorido.com.colorido.dto.ApiResponse;
import com.colorido.com.colorido.dto.auth.AuthResponse;
import com.colorido.com.colorido.dto.auth.RegisterRequest;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.service.JwtService;
import com.colorido.com.colorido.service.OtpService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/otp")
@RequiredArgsConstructor
public class OtpAuthController {

    private final OtpService otpService;

    private final JwtService jwtService;

    /*
     * =========================================================
     * REGISTRATION - SEND OTP
     * =========================================================
     */
    @PostMapping("/register/send")
    public ResponseEntity<ApiResponse<Void>> sendRegistrationOtp(
            @Valid @RequestBody RegisterRequest request
    ) {

        otpService.sendRegistrationOtp(request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "OTP sent successfully to your email",
                        null
                )
        );
    }

    /*
     * =========================================================
     * REGISTRATION - VERIFY OTP
     * =========================================================
     */
    @PostMapping("/register/verify")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyRegistrationOtp(
            @Valid @RequestBody OtpVerifyRequest request
    ) {

        User user =
                otpService.verifyRegistrationOtp(
                        request.getEmail(),
                        request.getOtp()
                );

        String token =
                jwtService.generateToken(user);

        AuthResponse authResponse =
                new AuthResponse(
                        token,
                        "Bearer",
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole().name()
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registration successful",
                        authResponse
                )
        );
    }

    /*
     * =========================================================
     * FORGOT PASSWORD - SEND OTP
     * =========================================================
     */
    @PostMapping("/forgot-password/send")
    public ResponseEntity<ApiResponse<Void>> sendForgotPasswordOtp(
            @Valid @RequestBody EmailRequest request
    ) {

        otpService.sendForgotPasswordOtp(
                request.getEmail()
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "If an account exists with this email, an OTP has been sent",
                        null
                )
        );
    }

    /*
     * =========================================================
     * FORGOT PASSWORD - RESET
     * =========================================================
     */
    @PostMapping("/forgot-password/reset")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody PasswordResetRequest request
    ) {

        otpService.resetPassword(
                request.getEmail(),
                request.getOtp(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Password reset successfully",
                        null
                )
        );
    }

    /*
     * =========================================================
     * OTP REQUEST
     * =========================================================
     */
    @Getter
    @Setter
    public static class OtpVerifyRequest {

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        private String email;

        @NotBlank(message = "OTP is required")
        @Size(
                min = 6,
                max = 6,
                message = "OTP must contain exactly 6 digits"
        )
        private String otp;
    }

    /*
     * =========================================================
     * EMAIL REQUEST
     * =========================================================
     */
    @Getter
    @Setter
    public static class EmailRequest {

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        private String email;
    }

    /*
     * =========================================================
     * PASSWORD RESET REQUEST
     * =========================================================
     */
    @Getter
    @Setter
    public static class PasswordResetRequest {

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email")
        private String email;

        @NotBlank(message = "OTP is required")
        @Size(
                min = 6,
                max = 6,
                message = "OTP must contain exactly 6 digits"
        )
        private String otp;

        @NotBlank(message = "New password is required")
        @Size(
                min = 8,
                max = 100,
                message = "Password must contain 8-100 characters"
        )
        private String newPassword;
    }
}