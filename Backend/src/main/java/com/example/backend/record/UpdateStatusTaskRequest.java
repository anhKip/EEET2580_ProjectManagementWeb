package com.example.backend.record;

import jakarta.validation.constraints.NotNull;

public record UpdateStatusTaskRequest(
        @NotNull
        Long userId,
        @NotNull
        Long projectId
) {
}
