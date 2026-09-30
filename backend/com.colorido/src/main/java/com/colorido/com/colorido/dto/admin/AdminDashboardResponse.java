package com.colorido.com.colorido.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private long totalEvents;

    private long totalRegistrations;

    private long totalParticipants;

    private long registeredUsers;

    private long newMessages;

    private long activeRegistrations;

    private List<RecentRegistration> recentRegistrations;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecentRegistration {

        private Long id;

        private String registrationCode;

        private String participantName;

        private String participantEmail;

        private String eventName;

        private String eventCategory;

        private String status;

        private Integer participantCount;

        private String registeredAt;
    }
}