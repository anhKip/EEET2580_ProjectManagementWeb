package com.example.backend.repository;

import com.example.backend.model.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UpdateRepository extends JpaRepository<Update, Long> {
    @Query(value = "SELECT * FROM update ORDER BY update_id DESC LIMIT 7", nativeQuery = true)
    List<Update> findTop7ByDateOrderByDateDateDesc();
    @Modifying
    @Query(value = "DELETE FROM update WHERE project_id = ?1", nativeQuery = true)
    void deleteByProjectId(Long projectId);
}
