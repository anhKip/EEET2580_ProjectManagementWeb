package com.example.backend.auth.record;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotNull
        Long id,
        @NotNull
        @Size(min = 8, max = 64)
        String newPassword
) {
}
