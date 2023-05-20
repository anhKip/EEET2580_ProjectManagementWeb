package com.example.backend.repository;

import com.example.backend.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    @Query(value = "SELECT p.* FROM project_member p where p.user_id = ?1 and p.project_id = ?2", nativeQuery = true)
    Optional<ProjectMember> findByUserIdAndProjectId(Long userId, Long projectId);
    @Query(value = "SELECT p.* FROM project_member p where p.member_id = ?1 and p.project_id = ?2", nativeQuery = true)
    Optional<ProjectMember> findByMemberIdAndProjectId(Long memberId, Long projectId);
    @Modifying
    @Query(value = "DELETE FROM project_member WHERE project_id = ?1", nativeQuery = true)
    void deleteByProjectId(Long projectId);
}
