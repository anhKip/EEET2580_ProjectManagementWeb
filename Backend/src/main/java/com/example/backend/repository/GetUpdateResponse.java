package com.example.backend.repository;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;
import java.time.LocalDateTime;

public record GetUpdateResponse(
        @NotNull
        String message,
        @NotNull
        @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
        LocalDateTime date
) {
}
