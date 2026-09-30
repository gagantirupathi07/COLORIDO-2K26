package com.colorido.com.colorido.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(
        name = "events",
        indexes = {
                @Index(name = "idx_event_slug", columnList = "slug"),
                @Index(name = "idx_event_category", columnList = "category"),
                @Index(name = "idx_event_date", columnList = "event_date")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 180)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private EventCategory category;

    @Column(length = 100)
    private String subcategory;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private EventGender gender = EventGender.OPEN;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String rules;

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Builder.Default
    private Integer teamSize = 1;

    @Column(precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal registrationFee = BigDecimal.ZERO;

    @Column(length = 200)
    private String venue;

    @Column(name = "event_date")
    private LocalDate eventDate;

    /*
     * Required for accurate 1-hour reminders.
     */
    @Column(name = "event_start_time")
    private LocalTime eventStartTime;

    @Column(name = "registration_deadline")
    private LocalDate registrationDeadline;

    @Column(length = 100)
    private String duration;

    @Column(length = 500)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private EventStatus status = EventStatus.OPEN_FOR_REGISTRATION;

    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private Integer maxParticipants = 100;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        if (createdAt == null) {
            createdAt = now;
        }

        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}