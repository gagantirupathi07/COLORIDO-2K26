package com.colorido.com.colorido.repository;

import com.colorido.com.colorido.entity.OtpPurpose;
import com.colorido.com.colorido.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpVerificationRepository
        extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification>
    findTopByEmailAndPurposeAndVerifiedFalseOrderByCreatedAtDesc(
            String email,
            OtpPurpose purpose
    );

    void deleteByEmailAndPurpose(
            String email,
            OtpPurpose purpose
    );
}