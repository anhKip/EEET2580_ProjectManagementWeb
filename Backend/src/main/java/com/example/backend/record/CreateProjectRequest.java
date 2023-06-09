package com.example.backend.record;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateProjectRequest(
        @NotNull
        @Size(max = 50)
        String name,
        @NotNull
        Long userId
) {
}
