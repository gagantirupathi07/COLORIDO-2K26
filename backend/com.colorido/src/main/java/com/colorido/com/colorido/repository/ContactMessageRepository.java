package com.colorido.com.colorido.repository;

import com.colorido.com.colorido.entity.ContactMessage;
import com.colorido.com.colorido.entity.ContactMessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findAllByOrderByCreatedAtDesc();

    List<ContactMessage> findByStatusOrderByCreatedAtDesc(
            ContactMessageStatus status
    );

    long countByStatus(ContactMessageStatus status);
}