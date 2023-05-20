package com.example.backend.repository;

import com.example.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Modifying
    @Query(value = "DELETE FROM task WHERE project_id = ?1", nativeQuery = true)
    void deleteByProjectId(Long projectId);
}
