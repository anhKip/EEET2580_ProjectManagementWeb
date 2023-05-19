package com.example.backend.record;

import com.example.backend.model.Priority;
import com.example.backend.model.Status;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.sql.Date;

@Builder
public record GetTaskResponse(
        @NotNull
        Long taskId,
        @NotNull
        String name,
        @NotNull
        Date deadline,
        String detail,
        @NotNull
        Priority priority,
        @NotNull
        Status status,
        @Nullable
        Long assignedTo
) {
}
