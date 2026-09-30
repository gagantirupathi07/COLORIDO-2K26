package com.colorido.com.colorido.controller;

import com.colorido.com.colorido.entity.Notification;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(
            @AuthenticationPrincipal User user
    ) {

        return ResponseEntity.ok(
                notificationService.getAll(user)
        );
    }

    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnread(
            @AuthenticationPrincipal User user
    ) {

        return ResponseEntity.ok(
                notificationService.getUnread(user)
        );
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(
            @AuthenticationPrincipal User user
    ) {

        return ResponseEntity.ok(
                notificationService.getUnreadCount(user)
        );
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {

        notificationService.markAsRead(id, user);

        return ResponseEntity.ok(
                new MessageResponse(
                        "Notification marked as read."
                )
        );
    }

    @PatchMapping("/read-all")
    public ResponseEntity<?> markAllAsRead(
            @AuthenticationPrincipal User user
    ) {

        notificationService.markAllAsRead(user);

        return ResponseEntity.ok(
                new MessageResponse(
                        "All notifications marked as read."
                )
        );
    }

    public record MessageResponse(String message) {
    }
}