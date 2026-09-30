package com.colorido.com.colorido.service;

import com.colorido.com.colorido.entity.Event;
import com.colorido.com.colorido.entity.Registration;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationScheduler {

    private final RegistrationRepository registrationRepository;
    private final NotificationService notificationService;

    /*
     * Runs every minute.
     *
     * Second 0 of every minute.
     */
    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void sendEventReminders() {

        LocalDateTime now = LocalDateTime.now();

        for (Registration registration :
                registrationRepository
                        .findAllByOrderByRegisteredAtDesc()) {

            try {

                processRegistration(
                        registration,
                        now
                );

            } catch (Exception exception) {

                log.error(
                        "Failed to process event reminder for registration {}",
                        registration.getId(),
                        exception
                );
            }
        }
    }

    private void processRegistration(
            Registration registration,
            LocalDateTime now
    ) {

        if (registration == null ||
                registration.getUser() == null ||
                registration.getEvent() == null) {

            return;
        }

        /*
         * Don't send reminders to cancelled registrations.
         *
         * Using the enum name avoids depending on a specific
         * RegistrationStatus enum constant in this scheduler.
         */
        if (registration.getStatus() != null &&
                "CANCELLED".equalsIgnoreCase(
                        registration.getStatus().name()
                )) {

            return;
        }

        Event event = registration.getEvent();

        LocalDate eventDate = event.getEventDate();

        LocalTime eventStartTime =
                event.getEventStartTime();

        /*
         * We need both date and time for accurate reminders.
         */
        if (eventDate == null ||
                eventStartTime == null) {

            return;
        }

        LocalDateTime eventStart =
                LocalDateTime.of(
                        eventDate,
                        eventStartTime
                );

        long secondsUntil =
                Duration.between(
                        now,
                        eventStart
                ).getSeconds();

        /*
         * Don't send reminders for events that started
         * more than one minute ago.
         */
        if (secondsUntil < -60) {
            return;
        }

        User user = registration.getUser();

        String eventName = event.getName();

        String referenceId =
                String.valueOf(event.getId());

        String eventDateText =
                eventDate.toString();

        String eventTimeText =
                eventStartTime.toString();

        String venue =
                event.getVenue() != null
                        ? event.getVenue()
                        : "Venue will be announced";

        /*
         * 2 DAYS
         */
        if (isNear(
                secondsUntil,
                Duration.ofDays(2).getSeconds()
        )) {

            createReminder(
                    registration,
                    user,
                    "Your Event is in 2 days",
                    "Your event \"" +
                            eventName +
                            "\" is scheduled on " +
                            eventDateText +
                            " at " +
                            eventTimeText +
                            " at " +
                            venue +
                            ".",
                    referenceId,
                    "2_DAYS"
            );
        }

        /*
         * 1 DAY
         */
        if (isNear(
                secondsUntil,
                Duration.ofDays(1).getSeconds()
        )) {

            createReminder(
                    registration,
                    user,
                    "Your Event is in 1 day",
                    "Your event \"" +
                            eventName +
                            "\" is scheduled tomorrow at " +
                            eventTimeText +
                            " at " +
                            venue +
                            ".",
                    referenceId,
                    "1_DAY"
            );
        }

        /*
         * 1 HOUR
         */
        if (isNear(
                secondsUntil,
                Duration.ofHours(1).getSeconds()
        )) {

            createReminder(
                    registration,
                    user,
                    "Your Event is in 1 hour",
                    "Your event \"" +
                            eventName +
                            "\" starts in approximately 1 hour at " +
                            venue +
                            ".",
                    referenceId,
                    "1_HOUR"
            );
        }

        /*
         * EVENT START
         */
        if (secondsUntil >= -60 &&
                secondsUntil <= 60) {

            createReminder(
                    registration,
                    user,
                    "Your Event is starting now",
                    "Your event \"" +
                            eventName +
                            "\" is starting now at " +
                            venue +
                            ".",
                    referenceId,
                    "NOW"
            );
        }
    }

    private boolean isNear(
            long actualSeconds,
            long targetSeconds
    ) {

        /*
         * The scheduler runs once per minute, so a
         * +/- 60 second tolerance prevents missing a
         * reminder because of scheduler execution delay.
         */
        return Math.abs(
                actualSeconds - targetSeconds
        ) <= 60;
    }

    private void createReminder(
            Registration registration,
            User user,
            String title,
            String message,
            String referenceId,
            String reminderType
    ) {

        String reminderKey =
                registration.getId() +
                        "_" +
                        reminderType;

        notificationService.createReminderIfNotExists(
                user,
                title,
                message,
                referenceId,
                reminderKey
        );
    }
}