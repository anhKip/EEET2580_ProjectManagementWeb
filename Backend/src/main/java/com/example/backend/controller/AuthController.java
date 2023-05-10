package com.example.backend.controller;

import com.example.backend.auth.config.record.SignInRecord;
import com.example.backend.auth.config.record.SignUpRecord;
import com.example.backend.model.UserAccount;
import com.example.backend.repository.UserAccountRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody @Valid SignInRecord signInRecord) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRecord.username(), signInRecord.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed in successfully.", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid SignUpRecord signUpRecord) {
        // check if username already exists in DB
        if (userAccountRepository.existsByUsername(signUpRecord.username())) {
            return new ResponseEntity<>("Username is already taken.", HttpStatus.BAD_REQUEST);
        }

        // check if email already exists in DB
        if (userAccountRepository.existsByEmail(signUpRecord.email())) {
            return new ResponseEntity<>("Email is already taken.", HttpStatus.BAD_REQUEST);
        }

        // finished checking, now create user object
        UserAccount userAccount = UserAccount.builder()
                .username(signUpRecord.username())
                .email(signUpRecord.email())
                .password(passwordEncoder.encode(signUpRecord.password()))
                .build();

        userAccountRepository.save(userAccount);

        return new ResponseEntity<>("User registered successfully.", HttpStatus.OK);
    }
}
