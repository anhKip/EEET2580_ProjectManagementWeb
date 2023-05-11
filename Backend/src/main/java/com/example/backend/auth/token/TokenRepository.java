package com.example.backend.auth.token;

import com.example.backend.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByValue(String value);
    Optional<Token> findFirstByUserAccount(UserAccount userAccount);
}
