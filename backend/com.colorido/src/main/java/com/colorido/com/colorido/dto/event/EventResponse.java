package com.colorido.com.colorido.dto.event;

import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.entity.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private Long id;

    private String name;

    private String slug;

    private EventCategory category;

    private String subcategory;

    private EventGender gender;

    private String description;

    private String rules;

    private String eligibility;

    private Integer teamSize;

    private BigDecimal registrationFee;

    private String venue;

    private LocalDate eventDate;

    private LocalTime eventStartTime;

    private LocalDate registrationDeadline;

    private String duration;

    private String imageUrl;

    private EventStatus status;

    private Boolean featured;

    private Integer maxParticipants;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}