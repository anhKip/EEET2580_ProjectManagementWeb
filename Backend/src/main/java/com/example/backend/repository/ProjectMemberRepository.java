package com.example.backend.repository;

import com.example.backend.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    @Query(value = "SELECT p.* FROM project_member p where p.user_id = ?1 and p.project_id = ?2", nativeQuery = true)
    Optional<ProjectMember> findByUserIdAndProjectId(Long userId, Long projectId);
    @Query(value = "SELECT p.* FROM project_member p where p.member_id = ?1 and p.project_id = ?2", nativeQuery = true)
    Optional<ProjectMember> findByMemberIdAndProjectId(Long memberId, Long projectId);
}
