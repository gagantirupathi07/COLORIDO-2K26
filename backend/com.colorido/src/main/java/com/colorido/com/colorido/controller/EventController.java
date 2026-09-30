package com.colorido.com.colorido.controller;

import com.colorido.com.colorido.dto.ApiResponse;
import com.colorido.com.colorido.dto.event.EventRequest;
import com.colorido.com.colorido.dto.event.EventResponse;
import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<EventResponse>>> getEvents(
            @RequestParam(required = false) EventCategory category,
            @RequestParam(required = false) EventGender gender,
            @RequestParam(required = false) String search
    ) {

        List<EventResponse> events;

        if (search != null && !search.isBlank()) {

            events = eventService.searchEvents(search);

        } else if (category != null && gender != null) {

            events = eventService.getByCategoryAndGender(
                    category,
                    gender
            );

        } else if (category != null) {

            events = eventService.getByCategory(category);

        } else {

            events = eventService.getAllEvents();
        }

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Events retrieved successfully",
                        events
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventResponse>> getEventById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Event retrieved successfully",
                        eventService.getEventById(id)
                )
        );
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<EventResponse>> getEventBySlug(
            @PathVariable String slug
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Event retrieved successfully",
                        eventService.getEventBySlug(slug)
                )
        );
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<EventResponse>>> getFeaturedEvents() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Featured events retrieved successfully",
                        eventService.getFeaturedEvents()
                )
        );
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EventResponse>> createEvent(
            @Valid @RequestBody EventRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Event created successfully",
                                eventService.createEvent(request)
                        )
                );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EventResponse>> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Event updated successfully",
                        eventService.updateEvent(
                                id,
                                request
                        )
                )
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @PathVariable Long id
    ) {

        eventService.deleteEvent(id);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Event deleted successfully"
                )
        );
    }
}