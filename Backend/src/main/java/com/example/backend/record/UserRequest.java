package com.example.backend.record;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequest(
        @NotNull
        @Email
        String email,
        @NotNull
        @Size(min = 3, max = 32)
        String username,
        @Nullable
        String description
) {
}
