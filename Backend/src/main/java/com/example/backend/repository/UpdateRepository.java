package com.example.backend.repository;

import com.example.backend.model.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UpdateRepository extends JpaRepository<Update, Long> {
    @Query(value = "SELECT * FROM update ORDER BY date DESC LIMIT 7", nativeQuery = true)
    List<Update> findTop7ByDateOrderByDateDateDesc();
}
