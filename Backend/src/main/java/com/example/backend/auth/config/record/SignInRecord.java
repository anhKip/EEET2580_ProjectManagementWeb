package com.example.backend.auth.config.record;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SignInRecord(
        @NotNull
        @Size(min = 3, max = 32)
        String username,
        @NotNull
        @Size(min = 8, max = 64)
        String password
) {
}
