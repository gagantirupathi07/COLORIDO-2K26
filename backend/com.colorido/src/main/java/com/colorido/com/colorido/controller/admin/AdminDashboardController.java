package com.colorido.com.colorido.controller.admin;

import com.colorido.com.colorido.dto.admin.AdminDashboardResponse;
import com.colorido.com.colorido.service.admin.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminDashboardResponse>
    getDashboardStatistics() {

        return ResponseEntity.ok(
                adminDashboardService.getDashboardStatistics()
        );
    }
}