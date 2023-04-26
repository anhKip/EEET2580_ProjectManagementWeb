package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "user_account")
public class UserAccount {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Size(min = 3, max = 50)
    @Column(name = "username")
    private String username;
    @NotBlank
    @Column(name = "user_email")
    private String email;
    @NotBlank
    @Column(name = "user_password")
    private String password;

    @Column(name = "user_score")
    private int score;
}
