package com.example.backend.record;

import jakarta.validation.constraints.NotNull;

public record ChangeProjectNameRequest(
        @NotNull
        String newName
) {
}
