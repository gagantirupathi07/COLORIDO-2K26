package com.colorido.com.colorido.dto.event;

import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.entity.EventStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventRequest {

    @NotBlank(message = "Event name is required")
    @Size(
            min = 2,
            max = 150,
            message = "Event name must be between 2 and 150 characters"
    )
    private String name;

    @NotBlank(message = "Slug is required")
    @Size(
            min = 2,
            max = 180,
            message = "Slug must be between 2 and 180 characters"
    )
    private String slug;

    @NotNull(message = "Event category is required")
    private EventCategory category;

    @Size(
            max = 100,
            message = "Subcategory cannot exceed 100 characters"
    )
    private String subcategory;

    @NotNull(message = "Gender is required")
    private EventGender gender;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Rules are required")
    private String rules;

    @NotBlank(message = "Eligibility is required")
    private String eligibility;

    @NotNull(message = "Team size is required")
    @Min(
            value = 1,
            message = "Team size must be at least 1"
    )
    private Integer teamSize;

    @NotNull(message = "Registration fee is required")
    @DecimalMin(
            value = "0.00",
            message = "Registration fee cannot be negative"
    )
    private BigDecimal registrationFee;

    @NotBlank(message = "Venue is required")
    private String venue;

    private LocalDate eventDate;

    private LocalTime eventStartTime;

    private LocalDate registrationDeadline;

    private String duration;

    private String imageUrl;

    @NotNull(message = "Event status is required")
    private EventStatus status;

    private Boolean featured;

    @NotNull(message = "Maximum participants is required")
    @Min(
            value = 1,
            message = "Maximum participants must be at least 1"
    )
    private Integer maxParticipants;
}