package com.colorido.com.colorido.repository;

import com.colorido.com.colorido.entity.RegistrationMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationMemberRepository
        extends JpaRepository<RegistrationMember, Long> {

    List<RegistrationMember> findByRegistrationId(
            Long registrationId
    );
}