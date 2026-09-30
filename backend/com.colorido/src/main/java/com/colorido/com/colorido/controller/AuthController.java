package com.colorido.com.colorido.controller;

import com.colorido.com.colorido.dto.ApiResponse;
import com.colorido.com.colorido.dto.auth.AuthResponse;
import com.colorido.com.colorido.dto.auth.LoginRequest;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.UserRepository;
import com.colorido.com.colorido.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    /*
     * LOGIN
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.getPassword()
                        )
                );

        User user = (User) authentication.getPrincipal();

        String token = jwtService.generateToken(user);

        AuthResponse authResponse =
                createAuthResponse(
                        user,
                        token
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Login successful",
                        authResponse
                )
        );
    }

    /*
     * CURRENT USER
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> getCurrentUser(
            Authentication authentication
    ) {

        User user = (User) authentication.getPrincipal();

        AuthResponse response =
                createAuthResponse(
                        user,
                        null
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Current user retrieved successfully",
                        response
                )
        );
    }

    /*
     * AUTH RESPONSE BUILDER
     */
    private AuthResponse createAuthResponse(
            User user,
            String token
    ) {

        return new AuthResponse(
                token,
                token != null ? "Bearer" : null,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}