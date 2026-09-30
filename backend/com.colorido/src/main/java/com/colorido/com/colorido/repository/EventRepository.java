package com.colorido.com.colorido.repository;

import com.colorido.com.colorido.entity.Event;
import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.entity.EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository
        extends JpaRepository<Event, Long> {

    Optional<Event> findBySlug(String slug);

    boolean existsBySlug(String slug);

    List<Event> findByCategoryOrderByNameAsc(
            EventCategory category
    );

    List<Event> findByCategoryAndGenderOrderByNameAsc(
            EventCategory category,
            EventGender gender
    );

    List<Event> findByStatusOrderByEventDateAsc(
            EventStatus status
    );

    List<Event> findByFeaturedTrueOrderByNameAsc();

    List<Event> findByNameContainingIgnoreCaseOrderByNameAsc(
            String name
    );
}