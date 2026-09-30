package com.colorido.com.colorido.config;

import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegistrationDataInitializer
        implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail =
                "colorido2k26@gmail.com";

        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User admin = User.builder()
                .fullName("COLORIDO Administrator")
                .email(adminEmail)
                .password(
                        passwordEncoder.encode(
                                "Admin@Colorido2K26"
                        )
                )
                .phone("9999999999")
                .college(
                        "COLORIDO 2K26 Organizing Committee"
                )
                .year("Organizer")
                .role(User.Role.ADMIN)
                .enabled(true)
                .build();

        userRepository.save(admin);
    }
}