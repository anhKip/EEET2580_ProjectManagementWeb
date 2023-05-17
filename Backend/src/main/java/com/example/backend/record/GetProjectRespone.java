package com.example.backend.record;

import jakarta.validation.constraints.NotNull;

public record GetProjectRespone(
        @NotNull
        Long id,
        @NotNull
        String name
) {
}
