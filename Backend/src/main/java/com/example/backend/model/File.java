package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@Table(name = "file")
public class File {
    @Id
    @Column(name = "file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 50)
    @NotBlank
    @Column(name = "file_name")
    private String name;

    @NotBlank
    @Column(name = "file_upload_date")
    private LocalDateTime uploadDate;

    @NotBlank
    @Column(name = "file_type")
    private String fileType;

    @NotBlank
    @Column(name = "file_resource")
    @Lob
    private byte[] data;

    @ManyToOne(targetEntity = Project.class)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(targetEntity = ProjectMember.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private ProjectMember member;
}
