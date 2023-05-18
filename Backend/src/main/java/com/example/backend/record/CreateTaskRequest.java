package com.example.backend.record;

import com.example.backend.model.Priority;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

public record CreateTaskRequest(
        @NotNull
        String name,
        @NotNull
        Priority priority,
        @NotNull
        String detail,
        @NotNull
        @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
        @Future
        Date deadline
) {
}
