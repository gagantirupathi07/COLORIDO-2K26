package com.colorido.com.colorido.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "registrations",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_registration_code",
                        columnNames = "registration_code"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "registration_code",
            nullable = false,
            unique = true,
            length = 30
    )
    private String registrationCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "event_id",
            nullable = false
    )
    private Event event;

    @Column(
            nullable = false,
            length = 150
    )
    private String participantName;

    @Column(
            nullable = false,
            length = 150
    )
    private String participantEmail;

    @Column(
            nullable = false,
            length = 20
    )
    private String participantPhone;

    @Column(
            nullable = false,
            length = 200
    )
    private String college;

    @Column(length = 150)
    private String teamName;

    @Column(nullable = false)
    private Integer participantCount;

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 30
    )
    @Builder.Default
    private RegistrationStatus status =
            RegistrationStatus.REGISTERED;

    @Column(
            nullable = false,
            updatable = false
    )
    @Builder.Default
    private LocalDateTime registeredAt =
            LocalDateTime.now();

    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "registration",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<RegistrationMember> members =
            new ArrayList<>();

    @PrePersist
    protected void onCreate() {

        if (registeredAt == null) {
            registeredAt = LocalDateTime.now();
        }

        if (status == null) {
            status = RegistrationStatus.REGISTERED;
        }

        if (participantCount == null) {
            participantCount = 1;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}