package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "task")
public class Task {
    @Id
    @Column(name = "task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "task_name")
    private String name;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm")
    @Column(name = "task_deadline")
    private Date deadline;

    @Column(name = "task_detail")
    private String detail;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_priority")
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne(targetEntity = Project.class)
    @JoinColumn(name = "project_id")
    private Project project;

    @Nullable
    @ManyToOne(targetEntity = ProjectMember.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private ProjectMember assignedTo;
}
