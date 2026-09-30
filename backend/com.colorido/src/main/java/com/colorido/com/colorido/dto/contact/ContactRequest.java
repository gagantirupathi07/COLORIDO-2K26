package com.colorido.com.colorido.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    private String email;

    @Pattern(
            regexp = "^$|^[0-9+()\\- ]{7,20}$",
            message = "Enter a valid phone number"
    )
    private String phone;

    @NotBlank(message = "Subject is required")
    @Size(min = 2, max = 200, message = "Subject must be between 2 and 200 characters")
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(min = 5, max = 5000, message = "Message must be between 5 and 5000 characters")
    private String message;
}