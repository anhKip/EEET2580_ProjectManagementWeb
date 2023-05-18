package com.example.backend.record;

import com.example.backend.model.Priority;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

public record CreateTaskRequest(
        @NotNull
        String name,
        @NotNull
        Priority priority,
        @NotNull
        @Future
        Date deadline
) {
}
