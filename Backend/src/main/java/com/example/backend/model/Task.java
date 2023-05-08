package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
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

    @Column(name = "task_label")
    private String label;

    @Column(name = "task_deadline")
    private Date deadline;

    @Column(name = "task_detail")
    private String detail;

    @Column(name = "task_priority", columnDefinition = "text default 'LOW'")
    private String priority;

    @Column(name = "completed", columnDefinition = "boolean default false")
    private Boolean completed;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccount assignedTo;
}
