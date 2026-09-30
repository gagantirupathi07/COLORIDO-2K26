package com.colorido.com.colorido.dto.contact;

import com.colorido.com.colorido.entity.ContactMessageStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactStatusRequest {

    @NotNull(message = "Status is required")
    private ContactMessageStatus status;
}