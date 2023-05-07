package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "project")
public class Project {
    @Id
    @Column(name = "project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "project_name")
    private String name;

    @ManyToMany(mappedBy = "projects")
    private List<UserAccount> users;
}
