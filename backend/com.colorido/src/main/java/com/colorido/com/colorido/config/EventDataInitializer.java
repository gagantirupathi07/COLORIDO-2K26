package com.colorido.com.colorido.config;

import com.colorido.com.colorido.entity.Event;
import com.colorido.com.colorido.entity.EventCategory;
import com.colorido.com.colorido.entity.EventGender;
import com.colorido.com.colorido.entity.EventStatus;
import com.colorido.com.colorido.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class EventDataInitializer implements CommandLineRunner {

    private final EventRepository eventRepository;

    @Override
    public void run(String... args) {

        if (eventRepository.count() > 0) {
            return;
        }

        eventRepository.saveAll(
                List.of(

                        cultural(
                                "Fine Arts",
                                "fine-arts",
                                "Fine Arts",
                                "Showcase your creativity through painting, sketching and visual expression.",
                                "Artwork must be original. Participants must bring their own materials. Final submissions must be completed within the allotted time.",
                                "Open to students representing their registered institution.",
                                1,
                                "Fine Arts Hall",
                                "90 minutes",
                                true
                        ),

                        cultural(
                                "Music & Band - Solo",
                                "music-band-solo",
                                "Music & Band",
                                "A solo musical performance celebrating talent, rhythm and expression.",
                                "Each participant gets a maximum of 7 minutes. Backing tracks must be submitted before the event.",
                                "Open to individual student participants.",
                                1,
                                "Main Auditorium",
                                "7 minutes",
                                true
                        ),

                        cultural(
                                "Music & Band - Group",
                                "music-band-group",
                                "Music & Band",
                                "A group musical performance featuring vocals, instruments or both.",
                                "Maximum performance time is 10 minutes. Groups must carry their own instruments unless otherwise announced.",
                                "Open to registered college teams.",
                                6,
                                "Main Auditorium",
                                "10 minutes",
                                true
                        ),

                        cultural(
                                "Dance - Solo",
                                "dance-solo",
                                "Dance",
                                "A solo dance performance combining technique, expression and stage presence.",
                                "Performance must not exceed 6 minutes. Participants are responsible for submitting their audio track.",
                                "Open to individual student participants.",
                                1,
                                "Open Air Stage",
                                "6 minutes",
                                true
                        ),

                        cultural(
                                "Dance - Group",
                                "dance-group",
                                "Dance",
                                "A coordinated group dance performance representing creativity and teamwork.",
                                "Maximum 12 performers. Performance duration is limited to 8 minutes.",
                                "Open to registered student teams.",
                                12,
                                "Open Air Stage",
                                "8 minutes",
                                true
                        ),

                        cultural(
                                "Choreoday",
                                "choreoday-theme-based",
                                "Theme Based",
                                "A theme-based choreography challenge where teams turn a concept into a powerful stage performance.",
                                "Theme interpretation, synchronization, creativity and stage presentation will be evaluated.",
                                "Open to college teams.",
                                12,
                                "Grand Stage",
                                "10 minutes",
                                true
                        ),

                        cultural(
                                "Dramatics",
                                "dramatics",
                                "Dramatics",
                                "A theatrical performance combining acting, storytelling and stagecraft.",
                                "Maximum performance time is 15 minutes. Teams must maintain appropriate stage conduct.",
                                "Open to registered student teams.",
                                15,
                                "Main Auditorium",
                                "15 minutes",
                                true
                        ),

                        cultural(
                                "Fashion Show",
                                "fashion-show",
                                "Fashion",
                                "A creative runway event celebrating style, confidence and coordinated presentation.",
                                "Teams must maintain appropriate themes and presentation. Maximum runway time is 10 minutes.",
                                "Open to registered college teams.",
                                10,
                                "Grand Stage",
                                "10 minutes",
                                false
                        ),

                        cultural(
                                "Tekraft Events",
                                "tekraft-events",
                                "Tekraft",
                                "A creative technology-focused event combining innovation, design and problem solving.",
                                "Participants must follow the challenge instructions provided by the event coordinators.",
                                "Open to students with valid institutional identification.",
                                3,
                                "Innovation Lab",
                                "120 minutes",
                                false
                        ),

                        cultural(
                                "Literary",
                                "literary",
                                "Literary",
                                "A platform for students to demonstrate writing, speaking and literary creativity.",
                                "Topics will be announced according to the individual competition format.",
                                "Open to registered student participants.",
                                1,
                                "Seminar Hall",
                                "90 minutes",
                                false
                        ),

                        sports(
                                "Basketball",
                                "basketball",
                                "BOYS",
                                "A competitive boys basketball tournament featuring institutional teams.",
                                "FIBA-inspired rules will be followed. Teams must report 30 minutes before their scheduled match.",
                                "Open to boys teams representing registered institutions.",
                                10,
                                "Main Basketball Court",
                                true
                        ),

                        sports(
                                "Volleyball",
                                "volleyball",
                                "BOYS",
                                "A competitive boys volleyball tournament focused on teamwork and sporting excellence.",
                                "Standard volleyball rules apply. Teams must report before their scheduled match.",
                                "Open to boys teams representing registered institutions.",
                                12,
                                "College Volleyball Court",
                                true
                        ),

                        sports(
                                "Table Tennis - Boys",
                                "table-tennis-boys",
                                "BOYS",
                                "A boys table tennis competition featuring singles and competitive rallies.",
                                "Matches will follow standard table tennis rules. Players must bring valid institutional identification.",
                                "Open to boys representing registered institutions.",
                                1,
                                "Indoor Sports Hall",
                                true
                        ),

                        sports(
                                "Throwball",
                                "throwball",
                                "GIRLS",
                                "A girls throwball tournament emphasizing coordination, teamwork and competitive spirit.",
                                "Teams must report before their scheduled match. Standard throwball rules will be followed.",
                                "Open to girls teams representing registered institutions.",
                                12,
                                "Main Sports Ground",
                                true
                        ),

                        sports(
                                "TenniKoit",
                                "tennikoit",
                                "GIRLS",
                                "A girls TenniKoit competition testing agility, precision and court awareness.",
                                "Matches will follow standard TenniKoit rules. Participants must carry institutional identification.",
                                "Open to girls representing registered institutions.",
                                2,
                                "Indoor Sports Hall",
                                true
                        ),

                        sports(
                                "Table Tennis - Girls",
                                "table-tennis-girls",
                                "GIRLS",
                                "A girls table tennis competition featuring individual competitive matches.",
                                "Matches will follow standard table tennis rules.",
                                "Open to girls representing registered institutions.",
                                1,
                                "Indoor Sports Hall",
                                false
                        )
                )
        );
    }

    private Event cultural(
            String name,
            String slug,
            String subcategory,
            String description,
            String rules,
            String eligibility,
            int teamSize,
            String venue,
            String duration,
            boolean featured
    ) {

        return Event.builder()
                .name(name)
                .slug(slug)
                .category(EventCategory.CULTURAL)
                .subcategory(subcategory)
                .gender(EventGender.OPEN)
                .description(description)
                .rules(rules)
                .eligibility(eligibility)
                .teamSize(teamSize)
                .registrationFee(BigDecimal.ZERO)
                .venue(venue)
                .eventDate(LocalDate.of(2026, 10, 12))
                .registrationDeadline(LocalDate.of(2026, 10, 11))
                .duration(duration)
                .status(EventStatus.OPEN_FOR_REGISTRATION)
                .featured(featured)
                .maxParticipants(100)
                .build();
    }

    private Event sports(
            String name,
            String slug,
            String gender,
            String description,
            String rules,
            String eligibility,
            int teamSize,
            String venue,
            boolean featured
    ) {

        return Event.builder()
                .name(name)
                .slug(slug)
                .category(EventCategory.SPORTS)
                .subcategory("Sports")
                .gender(EventGender.valueOf(gender))
                .description(description)
                .rules(rules)
                .eligibility(eligibility)
                .teamSize(teamSize)
                .registrationFee(BigDecimal.ZERO)
                .venue(venue)
                .eventDate(LocalDate.of(2026, 10, 13))
                .registrationDeadline(LocalDate.of(2026, 10, 11))
                .duration("120 minutes")
                .status(EventStatus.OPEN_FOR_REGISTRATION)
                .featured(featured)
                .maxParticipants(100)
                .build();
    }
}