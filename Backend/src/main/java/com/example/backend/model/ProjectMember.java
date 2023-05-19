package com.example.backend.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "project_member")
public class ProjectMember {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @Nullable
    @Column(name = "member_score", columnDefinition = "integer default 0")
    private int score;
    //    @ManyToOne(targetEntity = Project.class, cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @ManyToOne(targetEntity = Project.class)
    @JoinColumn(name = "project_id")
    private Project project;
    //    @ManyToOne(targetEntity = UserAccount.class, cascade = {CascadeType.DETACH, CascadeType.REFRESH})
    @ManyToOne(targetEntity = UserAccount.class)
    @JoinColumn(name = "user_id")
    private UserAccount user;

    @OneToMany(mappedBy = "assignedTo", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private List<Task> tasks = new ArrayList<>();
}
