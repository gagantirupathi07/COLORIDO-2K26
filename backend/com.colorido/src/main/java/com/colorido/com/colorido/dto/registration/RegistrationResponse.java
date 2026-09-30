package com.colorido.com.colorido.dto.registration;

import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.entity.RegistrationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationResponse {

    private Long id;

    private String registrationCode;

    private Long eventId;

    private String eventName;

    private String eventSlug;

    private EventCategory eventCategory;

    private EventGender eventGender;

    private String participantName;

    private String participantEmail;

    private String participantPhone;

    private String college;

    private String teamName;

    private Integer participantCount;

    private List<String> memberNames;

    private BigDecimal registrationFee;

    private String venue;

    private LocalDate eventDate;

    private RegistrationStatus status;

    private LocalDateTime registeredAt;

    private LocalDateTime updatedAt;
}