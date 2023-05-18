package com.example.backend.record;

import jakarta.validation.constraints.NotNull;

public record AddMemberRequest(
        @NotNull
        String username
) {
}
