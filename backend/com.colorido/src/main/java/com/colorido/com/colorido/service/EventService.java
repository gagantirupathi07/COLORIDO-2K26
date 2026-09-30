package com.colorido.com.colorido.service;

import com.colorido.com.colorido.dto.event.EventRequest;
import com.colorido.com.colorido.dto.event.EventResponse;
import com.colorido.com.colorido.entity.Event;
import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.exception.BadRequestException;
import com.colorido.com.colorido.exception.ResourceNotFoundException;
import com.colorido.com.colorido.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EventService {

    private final EventRepository eventRepository;

    @Transactional(readOnly = true)
    public List<EventResponse> getAllEvents() {

        return eventRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EventResponse getEventById(Long id) {

        Event event = eventRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with ID: " + id
                        )
                );

        return toResponse(event);
    }

    @Transactional(readOnly = true)
    public EventResponse getEventBySlug(String slug) {

        Event event = eventRepository
                .findBySlug(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with slug: " + slug
                        )
                );

        return toResponse(event);
    }

    @Transactional(readOnly = true)
    public List<EventResponse> getByCategory(
            EventCategory category
    ) {

        return eventRepository
                .findByCategoryOrderByNameAsc(category)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventResponse> getByCategoryAndGender(
            EventCategory category,
            EventGender gender
    ) {

        return eventRepository
                .findByCategoryAndGenderOrderByNameAsc(
                        category,
                        gender
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventResponse> getFeaturedEvents() {

        return eventRepository
                .findByFeaturedTrueOrderByNameAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<EventResponse> searchEvents(
            String keyword
    ) {

        if (keyword == null || keyword.isBlank()) {
            return getAllEvents();
        }

        return eventRepository
                .findByNameContainingIgnoreCaseOrderByNameAsc(
                        keyword.trim()
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EventResponse createEvent(
            EventRequest request
    ) {

        String slug = normalizeSlug(
                request.getSlug()
        );

        if (eventRepository.existsBySlug(slug)) {

            throw new BadRequestException(
                    "An event with this slug already exists"
            );
        }

        Event event = fromRequest(
                request,
                new Event()
        );

        event.setSlug(slug);

        Event savedEvent =
                eventRepository.save(event);

        return toResponse(savedEvent);
    }

    public EventResponse updateEvent(
            Long id,
            EventRequest request
    ) {

        Event event = eventRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with ID: " + id
                        )
                );

        String slug = normalizeSlug(
                request.getSlug()
        );

        eventRepository
                .findBySlug(slug)
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {

                        throw new BadRequestException(
                                "An event with this slug already exists"
                        );
                    }
                });

        fromRequest(request, event);

        event.setSlug(slug);

        Event updatedEvent =
                eventRepository.save(event);

        return toResponse(updatedEvent);
    }

    public void deleteEvent(Long id) {

        Event event = eventRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Event not found with ID: " + id
                        )
                );

        eventRepository.delete(event);
    }

    private Event fromRequest(
            EventRequest request,
            Event event
    ) {

        event.setName(
                request.getName().trim()
        );

        event.setCategory(
                request.getCategory()
        );

        event.setSubcategory(
                request.getSubcategory() == null
                        ? null
                        : request.getSubcategory().trim()
        );

        event.setGender(
                request.getGender()
        );

        event.setDescription(
                request.getDescription().trim()
        );

        event.setRules(
                request.getRules().trim()
        );

        event.setEligibility(
                request.getEligibility().trim()
        );

        event.setTeamSize(
                request.getTeamSize()
        );

        event.setRegistrationFee(
                request.getRegistrationFee()
        );

        event.setVenue(
                request.getVenue().trim()
        );

        event.setEventDate(
                request.getEventDate()
        );

        /*
         * Event start time is required for the
         * 1-hour and "starting now" reminders.
         */
        event.setEventStartTime(
                request.getEventStartTime()
        );

        event.setRegistrationDeadline(
                request.getRegistrationDeadline()
        );

        event.setDuration(
                request.getDuration() == null
                        ? "60 minutes"
                        : request.getDuration().trim()
        );

        event.setImageUrl(
                request.getImageUrl() == null
                        ? null
                        : request.getImageUrl().trim()
        );

        event.setStatus(
                request.getStatus()
        );

        event.setFeatured(
                Boolean.TRUE.equals(
                        request.getFeatured()
                )
        );

        event.setMaxParticipants(
                request.getMaxParticipants()
        );

        return event;
    }

    private EventResponse toResponse(
            Event event
    ) {

        return EventResponse.builder()
                .id(event.getId())
                .name(event.getName())
                .slug(event.getSlug())
                .category(event.getCategory())
                .subcategory(event.getSubcategory())
                .gender(event.getGender())
                .description(event.getDescription())
                .rules(event.getRules())
                .eligibility(event.getEligibility())
                .teamSize(event.getTeamSize())
                .registrationFee(event.getRegistrationFee())
                .venue(event.getVenue())
                .eventDate(event.getEventDate())

                /*
                 * Added for event reminders.
                 */
                .eventStartTime(
                        event.getEventStartTime()
                )

                .registrationDeadline(
                        event.getRegistrationDeadline()
                )
                .duration(event.getDuration())
                .imageUrl(event.getImageUrl())
                .status(event.getStatus())

                /*
                 * IMPORTANT:
                 * Event.featured is primitive boolean,
                 * therefore Lombok generates isFeatured().
                 */
                .featured(event.isFeatured())

                .maxParticipants(
                        event.getMaxParticipants()
                )
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }

    private String normalizeSlug(String slug) {

        return slug
                .trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }
}