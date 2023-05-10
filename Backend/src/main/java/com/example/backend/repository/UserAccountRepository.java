package com.example.backend.repository;

import com.example.backend.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findUserAccountByUsername(String username);
    Optional<UserAccount> findUserAccountByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
