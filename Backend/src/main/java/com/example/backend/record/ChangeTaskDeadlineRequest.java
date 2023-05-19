package com.example.backend.record;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;
import java.time.LocalDateTime;

public record ChangeTaskDeadlineRequest(
        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
        @Future
        LocalDateTime deadline
) {
}
