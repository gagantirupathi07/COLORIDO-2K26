package com.colorido.com.colorido.dto.registration;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {

    @NotNull(message = "Event ID is required")
    private Long eventId;

    @NotBlank(message = "Participant name is required")
    @Size(
            min = 2,
            max = 150,
            message = "Participant name must be between 2 and 150 characters"
    )
    private String participantName;

    @NotBlank(message = "Participant email is required")
    private String participantEmail;

    @NotBlank(message = "Participant phone is required")
    private String participantPhone;

    @NotBlank(message = "College is required")
    private String college;

    @Size(
            max = 150,
            message = "Team name cannot exceed 150 characters"
    )
    private String teamName;

    @NotNull(message = "Participant count is required")
    @Min(
            value = 1,
            message = "Participant count must be at least 1"
    )
    private Integer participantCount;

    private List<
            @Size(
                    min = 2,
                    max = 150,
                    message = "Member name must be between 2 and 150 characters"
            )
                    String
            > memberNames;
}