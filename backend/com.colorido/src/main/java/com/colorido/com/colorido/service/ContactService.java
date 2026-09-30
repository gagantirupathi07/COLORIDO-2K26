package com.colorido.com.colorido.service;

import com.colorido.com.colorido.dto.contact.ContactRequest;
import com.colorido.com.colorido.dto.contact.ContactResponse;
import com.colorido.com.colorido.entity.ContactMessage;
import com.colorido.com.colorido.entity.ContactMessageStatus;
import com.colorido.com.colorido.entity.User;
import com.colorido.com.colorido.repository.ContactMessageRepository;
import com.colorido.com.colorido.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    @Value("${colorido.contact.email}")
    private String contactEmail;

    @Transactional
    public ContactResponse createMessage(
            ContactRequest request,
            String authenticatedEmail
    ) {
        User user = null;

        if (authenticatedEmail != null && !authenticatedEmail.isBlank()) {
            user = userRepository.findByEmail(authenticatedEmail)
                    .orElse(null);
        }

        ContactMessage contactMessage = ContactMessage.builder()
                .name(request.getName().trim())
                .email(request.getEmail().trim())
                .phone(normalize(request.getPhone()))
                .subject(request.getSubject().trim())
                .message(request.getMessage().trim())
                .status(ContactMessageStatus.NEW)
                .user(user)
                .build();

        ContactMessage saved = contactMessageRepository.save(contactMessage);

        sendContactEmail(saved);

        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ContactResponse> getAllMessages() {
        return contactMessageRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ContactResponse> getMessagesByStatus(
            ContactMessageStatus status
    ) {
        return contactMessageRepository
                .findByStatusOrderByCreatedAtDesc(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ContactResponse getMessage(Long id) {
        ContactMessage message = contactMessageRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Contact message not found")
                );

        return mapToResponse(message);
    }

    @Transactional
    public ContactResponse updateStatus(
            Long id,
            ContactMessageStatus status
    ) {
        ContactMessage message = contactMessageRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Contact message not found")
                );

        message.setStatus(status);

        ContactMessage updated =
                contactMessageRepository.save(message);

        return mapToResponse(updated);
    }

    @Transactional
    public void deleteMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new RuntimeException("Contact message not found");
        }

        contactMessageRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long getUnreadCount() {
        return contactMessageRepository.countByStatus(
                ContactMessageStatus.NEW
        );
    }

    private void sendContactEmail(ContactMessage contactMessage) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();

            mail.setTo(contactEmail);
            mail.setReplyTo(contactMessage.getEmail());
            mail.setSubject(
                    "COLORIDO 2K26 Contact: "
                            + contactMessage.getSubject()
            );

            StringBuilder body = new StringBuilder();

            body.append("New contact message received")
                    .append("\n\n");

            body.append("Name: ")
                    .append(contactMessage.getName())
                    .append("\n");

            body.append("Email: ")
                    .append(contactMessage.getEmail())
                    .append("\n");

            body.append("Phone: ")
                    .append(
                            contactMessage.getPhone() == null
                                    ? "Not provided"
                                    : contactMessage.getPhone()
                    )
                    .append("\n");

            body.append("Subject: ")
                    .append(contactMessage.getSubject())
                    .append("\n\n");

            body.append("Message:")
                    .append("\n")
                    .append(contactMessage.getMessage())
                    .append("\n\n");

            body.append("Message ID: ")
                    .append(contactMessage.getId());

            mail.setText(body.toString());

            mailSender.send(mail);

            log.info(
                    "Contact email sent successfully to {}",
                    contactEmail
            );

        } catch (Exception exception) {

            log.error(
                    "Failed to send contact email to {}",
                    contactEmail,
                    exception
            );

            throw new RuntimeException(
                    "Unable to send contact email"
            );
        }
    }

    private ContactResponse mapToResponse(
            ContactMessage message
    ) {
        return ContactResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .phone(message.getPhone())
                .subject(message.getSubject())
                .message(message.getMessage())
                .status(message.getStatus())
                .userId(
                        message.getUser() != null
                                ? message.getUser().getId()
                                : null
                )
                .createdAt(message.getCreatedAt())
                .updatedAt(message.getUpdatedAt())
                .build();
    }

    private String normalize(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}