package com.example.backend.record;

import com.example.backend.model.Priority;
import com.example.backend.model.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
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
        @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
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
