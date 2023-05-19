package com.example.backend.record;

import jakarta.validation.constraints.NotNull;

public record AssignTaskRequest (
        @NotNull
        Long userId,
        @NotNull
        Long projectId
) {
}
