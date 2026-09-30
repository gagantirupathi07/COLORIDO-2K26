package com.colorido.com.colorido.controller;

import com.colorido.com.colorido.dto.ApiResponse;
import com.colorido.com.colorido.dto.registration.RegistrationRequest;
import com.colorido.com.colorido.dto.registration.RegistrationResponse;
import com.colorido.com.colorido.entity.RegistrationStatus;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.service.RegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RegistrationResponse>> register(
            @Valid @RequestBody RegistrationRequest request,
            org.springframework.security.core.Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        RegistrationResponse response =
                registrationService.createRegistration(
                        user.getId(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Event registration successful",
                                response
                        )
                );
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<RegistrationResponse>>> getMyRegistrations(
            org.springframework.security.core.Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Your registrations retrieved successfully",
                        registrationService.getMyRegistrations(
                                user.getId()
                        )
                )
        );
    }

    @GetMapping("/my/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RegistrationResponse>> getMyRegistration(
            @PathVariable Long id,
            org.springframework.security.core.Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registration retrieved successfully",
                        registrationService.getMyRegistrationById(
                                user.getId(),
                                id
                        )
                )
        );
    }

    @DeleteMapping("/my/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> cancelRegistration(
            @PathVariable Long id,
            org.springframework.security.core.Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        registrationService.cancelMyRegistration(
                user.getId(),
                id
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registration cancelled successfully"
                )
        );
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ApiResponse<RegistrationResponse>> getByCode(
            @PathVariable String code
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registration retrieved successfully",
                        registrationService
                                .getByRegistrationCode(code)
                )
        );
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<RegistrationResponse>>> getAllRegistrations() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "All registrations retrieved successfully",
                        registrationService.getAllRegistrations()
                )
        );
    }

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RegistrationResponse>> getRegistration(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registration retrieved successfully",
                        registrationService
                                .getRegistrationById(id)
                )
        );
    }

    @PatchMapping("/admin/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<RegistrationResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam RegistrationStatus status
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Registration status updated successfully",
                        registrationService.updateStatus(
                                id,
                                status
                        )
                )
        );
    }
}