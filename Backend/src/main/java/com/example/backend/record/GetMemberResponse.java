package com.example.backend.record;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record GetMemberResponse(
        @NotNull
        Long id,
        @NotNull
        String username,
        @NotNull
        @Size(min = 0)
        int score
) {
}
