package com.colorido.com.colorido.service.admin;

import com.colorido.com.colorido.dto.admin.AdminDashboardResponse;
import com.colorido.com.colorido.entity.Registration;
import com.colorido.com.colorido.entity.RegistrationStatus;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.ContactMessageRepository;
import com.colorido.com.colorido.repository.EventRepository;
import com.colorido.com.colorido.repository.RegistrationRepository;
import com.colorido.com.colorido.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final EventRepository eventRepository;

    private final RegistrationRepository registrationRepository;

    private final UserRepository userRepository;

    private final ContactMessageRepository contactMessageRepository;

    private static final DateTimeFormatter DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboardStatistics() {

        List<Registration> registrations =
                registrationRepository.findAllByOrderByRegisteredAtDesc();

        long totalEvents =
                eventRepository.count();

        long totalRegistrations =
                registrations.stream()
                        .filter(registration ->
                                registration.getStatus() !=
                                        RegistrationStatus.CANCELLED
                        )
                        .count();

        long activeRegistrations =
                registrations.stream()
                        .filter(registration ->
                                registration.getStatus() !=
                                        RegistrationStatus.CANCELLED
                        )
                        .count();

        long totalParticipants =
                registrations.stream()
                        .filter(registration ->
                                registration.getStatus() !=
                                        RegistrationStatus.CANCELLED
                        )
                        .mapToLong(registration ->
                                registration.getParticipantCount() == null
                                        ? 0
                                        : registration.getParticipantCount()
                        )
                        .sum();

        long registeredUsers =
                userRepository.findAll()
                        .stream()
                        .filter(user ->
                                user.getRole() == User.Role.USER
                        )
                        .count();

        long newMessages =
                contactMessageRepository.countByStatus(
                        com.colorido.com.colorido.entity.ContactMessageStatus.NEW
                );

        List<AdminDashboardResponse.RecentRegistration>
                recentRegistrations =
                registrations.stream()
                        .limit(6)
                        .map(this::mapRecentRegistration)
                        .toList();

        return AdminDashboardResponse.builder()
                .totalEvents(totalEvents)
                .totalRegistrations(totalRegistrations)
                .totalParticipants(totalParticipants)
                .registeredUsers(registeredUsers)
                .newMessages(newMessages)
                .activeRegistrations(activeRegistrations)
                .recentRegistrations(recentRegistrations)
                .build();
    }

    private AdminDashboardResponse.RecentRegistration
    mapRecentRegistration(
            Registration registration
    ) {

        String eventName = null;
        String eventCategory = null;

        if (registration.getEvent() != null) {
            eventName =
                    registration.getEvent().getName();

            if (registration.getEvent().getCategory() != null) {
                eventCategory =
                        registration.getEvent()
                                .getCategory()
                                .name();
            }
        }

        LocalDateTime registeredAt =
                registration.getRegisteredAt();

        return AdminDashboardResponse.RecentRegistration.builder()
                .id(registration.getId())
                .registrationCode(
                        registration.getRegistrationCode()
                )
                .participantName(
                        registration.getParticipantName()
                )
                .participantEmail(
                        registration.getParticipantEmail()
                )
                .eventName(eventName)
                .eventCategory(eventCategory)
                .status(
                        registration.getStatus() == null
                                ? null
                                : registration.getStatus().name()
                )
                .participantCount(
                        registration.getParticipantCount()
                )
                .registeredAt(
                        registeredAt == null
                                ? null
                                : registeredAt.format(
                                DATE_TIME_FORMATTER
                        )
                )
                .build();
    }
}