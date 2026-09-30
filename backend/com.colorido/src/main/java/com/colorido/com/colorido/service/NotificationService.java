package com.colorido.com.colorido.service;

import com.colorido.com.colorido.entity.Notification;
import com.colorido.com.colorido.entity.NotificationType;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Transactional
    public Notification createNotification(
            User user,
            String title,
            String message,
            NotificationType type,
            String referenceId
    ) {

        Notification notification =
                Notification.builder()
                        .user(user)
                        .title(title)
                        .message(message)
                        .type(type)
                        .referenceId(referenceId)
                        .read(false)
                        .build();

        Notification saved =
                notificationRepository.save(notification);

        sendEmail(
                user,
                title,
                message
        );

        return saved;
    }

    @Transactional
    public void createReminderIfNotExists(
            User user,
            String title,
            String message,
            String referenceId,
            String reminderKey
    ) {

        if (user == null ||
                user.getId() == null ||
                user.getEmail() == null ||
                user.getEmail().isBlank()) {

            return;
        }

        if (notificationRepository
                .existsByUserIdAndReminderKey(
                        user.getId(),
                        reminderKey
                )) {

            return;
        }

        Notification notification =
                Notification.builder()
                        .user(user)
                        .title(title)
                        .message(message)
                        .type(NotificationType.EVENT_REMINDER)
                        .referenceId(referenceId)
                        .reminderKey(reminderKey)
                        .read(false)
                        .createdAt(LocalDateTime.now())
                        .build();

        Notification saved =
                notificationRepository.save(notification);

        sendEmail(
                user,
                saved.getTitle(),
                saved.getMessage()
        );
    }

    private void sendEmail(
            User user,
            String title,
            String message
    ) {

        if (user == null ||
                user.getEmail() == null ||
                user.getEmail().isBlank()) {

            return;
        }

        try {

            SimpleMailMessage mail =
                    new SimpleMailMessage();

            mail.setTo(user.getEmail());
            mail.setFrom(senderEmail);

            mail.setSubject(
                    "COLORIDO 2K26 - " + title
            );

            String body =
                    "Hello " +
                            user.getFullName() +
                            ",\n\n" +

                            message +
                            "\n\n" +

                            "Please make sure to arrive at the venue on time.\n\n" +

                            "Regards,\n" +
                            "COLORIDO 2K26 Organizing Team\n" +
                            "R.V.R. & J.C. College of Engineering";

            mail.setText(body);

            mailSender.send(mail);

            log.info(
                    "Notification email sent to {}",
                    user.getEmail()
            );

        } catch (Exception exception) {

            log.error(
                    "Failed to send notification email to {}",
                    user.getEmail(),
                    exception
            );
        }
    }

    @Transactional(readOnly = true)
    public List<Notification> getAll(User user) {

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(
                        user.getId()
                );
    }

    @Transactional(readOnly = true)
    public List<Notification> getUnread(User user) {

        return notificationRepository
                .findByUserIdAndReadFalseOrderByCreatedAtDesc(
                        user.getId()
                );
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(User user) {

        return notificationRepository
                .countByUserIdAndReadFalse(
                        user.getId()
                );
    }

    @Transactional
    public void markAsRead(
            Long notificationId,
            User user
    ) {

        Notification notification =
                notificationRepository
                        .findById(notificationId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Notification not found."
                                )
                        );

        if (!notification.getUser()
                .getId()
                .equals(user.getId())) {

            throw new IllegalArgumentException(
                    "You cannot modify this notification."
            );
        }

        notification.setRead(true);
        notification.setReadAt(
                LocalDateTime.now()
        );

        notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead(User user) {

        List<Notification> notifications =
                notificationRepository
                        .findByUserIdAndReadFalseOrderByCreatedAtDesc(
                                user.getId()
                        );

        LocalDateTime now =
                LocalDateTime.now();

        for (Notification notification :
                notifications) {

            notification.setRead(true);
            notification.setReadAt(now);
        }

        notificationRepository.saveAll(
                notifications
        );
    }
}