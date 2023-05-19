package com.example.backend.record;

import com.example.backend.model.Priority;
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
        Boolean completed,
        @Nullable
        Long assignedTo
) {
}
