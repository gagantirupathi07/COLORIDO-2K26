package com.colorido.com.colorido.repository;

import com.colorido.com.colorido.entity.Registration;
import com.colorido.com.colorido.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    boolean existsByUserIdAndEventIdAndStatusNot(
            Long userId,
            Long eventId,
            RegistrationStatus status
    );

    long countByEventIdAndStatusNot(
            Long eventId,
            RegistrationStatus status
    );

    List<Registration> findByUserIdOrderByRegisteredAtDesc(
            Long userId
    );

    List<Registration> findByEventIdOrderByRegisteredAtDesc(
            Long eventId
    );

    List<Registration> findAllByOrderByRegisteredAtDesc();

    Optional<Registration> findByRegistrationCode(
            String registrationCode
    );

    List<Registration> findByStatusOrderByRegisteredAtDesc(
            RegistrationStatus status
    );
}