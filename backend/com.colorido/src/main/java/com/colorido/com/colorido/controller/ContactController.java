package com.colorido.com.colorido.controller;

import com.colorido.com.colorido.dto.ApiResponse;
import com.colorido.com.colorido.dto.contact.ContactRequest;
import com.colorido.com.colorido.dto.contact.ContactResponse;
import com.colorido.com.colorido.dto.contact.ContactStatusRequest;
import com.colorido.com.colorido.entity.ContactMessageStatus;
import com.colorido.com.colorido.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse<ContactResponse>> createMessage(
            @Valid @RequestBody ContactRequest request,
            Authentication authentication
    ) {
        String email = null;

        if (authentication != null
                && authentication.isAuthenticated()) {
            email = authentication.getName();
        }

        ContactResponse response =
                contactService.createMessage(request, email);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Your message has been sent successfully",
                                response
                        )
                );
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ContactResponse>>> getAllMessages() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Contact messages retrieved successfully",
                        contactService.getAllMessages()
                )
        );
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ContactResponse>>> getByStatus(
            @PathVariable ContactMessageStatus status
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Contact messages retrieved successfully",
                        contactService.getMessagesByStatus(status)
                )
        );
    }

    @GetMapping("/count/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Long>> getNewCount() {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "New contact message count retrieved successfully",
                        contactService.getUnreadCount()
                )
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ContactResponse>> getMessage(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Contact message retrieved successfully",
                        contactService.getMessage(id)
                )
        );
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ContactResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody ContactStatusRequest request
    ) {
        return ResponseEntity.ok(
                ApiResponse.success(
                        "Contact message status updated successfully",
                        contactService.updateStatus(
                                id,
                                request.getStatus()
                        )
                )
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(
            @PathVariable Long id
    ) {
        contactService.deleteMessage(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Contact message deleted successfully",
                        null
                )
        );
    }
}