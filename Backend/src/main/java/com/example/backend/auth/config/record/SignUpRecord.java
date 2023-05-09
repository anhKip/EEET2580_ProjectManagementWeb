package com.example.backend.auth.config.record;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignUpRecord(
        @NotNull
        @Email
        String email,
        @NotNull
        String username,
        @NotNull
        @Size(min = 8, max = 64)
        String password
) {
}
