package com.colorido.com.colorido.service;

import com.colorido.com.colorido.dto.registration.RegistrationRequest;
import com.colorido.com.colorido.dto.registration.RegistrationResponse;
import com.colorido.com.colorido.entity.Event;
import com.colorido.com.colorido.entity.EventStatus;
import com.colorido.com.colorido.entity.NotificationType;
import com.colorido.com.colorido.entity.Registration;
import com.colorido.com.colorido.entity.RegistrationMember;
import com.colorido.com.colorido.entity.RegistrationStatus;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.exception.BadRequestException;
import com.colorido.com.colorido.exception.ResourceNotFoundException;
import com.colorido.com.colorido.repository.EventRepository;
import com.colorido.com.colorido.repository.RegistrationRepository;
import com.colorido.com.colorido.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public RegistrationResponse createRegistration(
            Long userId,
            RegistrationRequest request
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        Event event = eventRepository
                .findById(request.getEventId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with ID: "
                                        + request.getEventId()
                        )
                );

        if (event.getStatus()
                != EventStatus.OPEN_FOR_REGISTRATION) {

            throw new BadRequestException(
                    "Registration is not open for this event"
            );
        }

        if (registrationRepository
                .existsByUserIdAndEventIdAndStatusNot(
                        userId,
                        event.getId(),
                        RegistrationStatus.CANCELLED
                )) {

            throw new BadRequestException(
                    "You are already registered for this event"
            );
        }
        if (request.getParticipantCount()
                > event.getTeamSize()) {

            throw new BadRequestException(
                    "This event allows a maximum of "
                            + event.getTeamSize()
                            + " participant(s)"
            );
        }

        List<String> memberNames =
                request.getMemberNames();

        if (memberNames == null
                || memberNames.isEmpty()) {

            throw new BadRequestException(
                    "At least one participant name is required"
            );
        }

        if (memberNames.size()
                != request.getParticipantCount()) {

            throw new BadRequestException(
                    "Number of member names must match participant count"
            );
        }

        long registeredCount =
                registrationRepository
                        .countByEventIdAndStatusNot(
                                event.getId(),
                                RegistrationStatus.CANCELLED
                        );

        if (registeredCount
                + request.getParticipantCount()
                > event.getMaxParticipants()) {

            throw new BadRequestException(
                    "Registration capacity for this event has been reached"
            );
        }

        Registration registration =
                Registration.builder()
                        .registrationCode(
                                generateRegistrationCode()
                        )
                        .user(user)
                        .event(event)
                        .participantName(
                                request.getParticipantName()
                                        .trim()
                        )
                        .participantEmail(
                                request.getParticipantEmail()
                                        .trim()
                                        .toLowerCase()
                        )
                        .participantPhone(
                                request.getParticipantPhone()
                                        .trim()
                        )
                        .college(
                                request.getCollege()
                                        .trim()
                        )
                        .teamName(
                                request.getTeamName() == null
                                        ? null
                                        : request.getTeamName()
                                        .trim()
                        )
                        .participantCount(
                                request.getParticipantCount()
                        )
                        .status(
                                RegistrationStatus.REGISTERED
                        )
                        .build();

        List<RegistrationMember> members =
                new ArrayList<>();

        for (String memberName : memberNames) {

            RegistrationMember member =
                    RegistrationMember.builder()
                            .registration(registration)
                            .name(memberName.trim())
                            .build();

            members.add(member);
        }

        registration.setMembers(members);

        Registration savedRegistration =
                registrationRepository.save(
                        registration
                );

        notificationService.createNotification(
                user,
                "Registration Successful",
                "You have successfully registered for \"" +
                        event.getName() +
                        "\". Your registration ID is " +
                        savedRegistration.getRegistrationCode() +
                        ". Event date: " +
                        (event.getEventDate() != null
                                ? event.getEventDate()
                                : "To be announced") +
                        ". Venue: " +
                        (event.getVenue() != null
                                ? event.getVenue()
                                : "Venue will be announced") +
                        ".",
                NotificationType.REGISTRATION,
                String.valueOf(savedRegistration.getId())
        );

        return toResponse(savedRegistration);
    }

    @Transactional(readOnly = true)
    public List<RegistrationResponse> getMyRegistrations(
            Long userId
    ) {

        return registrationRepository
                .findByUserIdOrderByRegisteredAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public RegistrationResponse getMyRegistrationById(
            Long userId,
            Long registrationId
    ) {

        Registration registration =
                registrationRepository
                        .findById(registrationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Registration not found"
                                )
                        );

        if (!registration
                .getUser()
                .getId()
                .equals(userId)) {

            throw new BadRequestException(
                    "You are not authorized to view this registration"
            );
        }

        return toResponse(registration);
    }

    @Transactional(readOnly = true)
    public List<RegistrationResponse> getAllRegistrations() {

        return registrationRepository
                .findAllByOrderByRegisteredAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public RegistrationResponse getRegistrationById(
            Long id
    ) {

        Registration registration =
                registrationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Registration not found with ID: "
                                                + id
                                )
                        );

        return toResponse(registration);
    }

    @Transactional(readOnly = true)
    public RegistrationResponse getByRegistrationCode(
            String code
    ) {

        Registration registration =
                registrationRepository
                        .findByRegistrationCode(
                                code.trim().toUpperCase()
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Registration not found"
                                )
                        );

        return toResponse(registration);
    }

    public RegistrationResponse updateStatus(
            Long id,
            RegistrationStatus status
    ) {

        Registration registration =
                registrationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Registration not found"
                                )
                        );

        registration.setStatus(status);

        return toResponse(
                registrationRepository.save(registration)
        );
    }

    public void cancelMyRegistration(
            Long userId,
            Long registrationId
    ) {

        Registration registration =
                registrationRepository
                        .findById(registrationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Registration not found"
                                )
                        );

        if (!registration
                .getUser()
                .getId()
                .equals(userId)) {

            throw new BadRequestException(
                    "You are not authorized to cancel this registration"
            );
        }

        if (registration.getStatus()
                == RegistrationStatus.COMPLETED) {

            throw new BadRequestException(
                    "Completed registrations cannot be cancelled"
            );
        }

        if (registration.getStatus()
                == RegistrationStatus.CANCELLED) {

            throw new BadRequestException(
                    "This registration is already cancelled"
            );
        }

        registration.setStatus(
                RegistrationStatus.CANCELLED
        );

        Registration savedRegistration =
                registrationRepository.save(
                        registration
                );

        Event event =
                registration.getEvent();

        notificationService.createNotification(
                registration.getUser(),
                "Registration Cancelled",
                "Your registration for \"" +
                        event.getName() +
                        "\" has been cancelled successfully. " +
                        "Registration ID: " +
                        savedRegistration.getRegistrationCode() +
                        ".",
                NotificationType.REGISTRATION,
                String.valueOf(savedRegistration.getId())
        );
    }

    private String generateRegistrationCode() {

        String code;

        do {

            code = "COL-"
                    + UUID.randomUUID()
                    .toString()
                    .substring(0, 8)
                    .toUpperCase();

        } while (
                registrationRepository
                        .findByRegistrationCode(code)
                        .isPresent()
        );

        return code;
    }

    private RegistrationResponse toResponse(
            Registration registration
    ) {

        List<String> memberNames =
                registration.getMembers()
                        .stream()
                        .map(RegistrationMember::getName)
                        .toList();

        Event event =
                registration.getEvent();

        return RegistrationResponse.builder()
                .id(registration.getId())
                .registrationCode(
                        registration.getRegistrationCode()
                )
                .eventId(event.getId())
                .eventName(event.getName())
                .eventSlug(event.getSlug())
                .eventCategory(event.getCategory())
                .eventGender(event.getGender())
                .participantName(
                        registration.getParticipantName()
                )
                .participantEmail(
                        registration.getParticipantEmail()
                )
                .participantPhone(
                        registration.getParticipantPhone()
                )
                .college(
                        registration.getCollege()
                )
                .teamName(
                        registration.getTeamName()
                )
                .participantCount(
                        registration.getParticipantCount()
                )
                .memberNames(memberNames)
                .registrationFee(
                        event.getRegistrationFee()
                )
                .venue(event.getVenue())
                .eventDate(event.getEventDate())
                .status(registration.getStatus())
                .registeredAt(
                        registration.getRegisteredAt()
                )
                .updatedAt(
                        registration.getUpdatedAt()
                )
                .build();
    }
}