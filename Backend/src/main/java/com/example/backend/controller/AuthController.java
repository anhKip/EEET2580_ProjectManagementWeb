package com.example.backend.controller;

import com.example.backend.auth.record.*;
import com.example.backend.auth.token.Token;
import com.example.backend.auth.token.TokenRepository;
import com.example.backend.auth.token.TokenService;
import com.example.backend.model.UserAccount;
import com.example.backend.repository.UserAccountRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/auth")
public class AuthController {
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private TokenRepository tokenRepository;
    @Value("${application.security.jwt.accessTokenMin}")
    private int accessTokenMin;
    @Value("${application.security.jwt.refreshTokenMin}")
    private int refreshTokenMin;

    @PostMapping(value = "/signin")
    public ResponseEntity<SignInResponse> authenticateUser(@RequestBody @Valid SignInRequest signInRecord) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRecord.username(), signInRecord.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserAccount userAccount = (UserAccount) authentication.getPrincipal();
        String refreshTokenValue = tokenService.generateJwtToken(authentication.getName(), refreshTokenMin);
        String accessTokenValue = tokenService.generateJwtToken(authentication.getName(), accessTokenMin);

        LocalDateTime currentDateTime = LocalDateTime.now();
        Token refreshToken = Token.builder()
                .value(refreshTokenValue)
                .createdAt(currentDateTime)
                .expiresAt(currentDateTime.plusMinutes(refreshTokenMin))
                .revoked(false)
                .userAccount(userAccount)
                .build();
        tokenRepository.save(refreshToken);
        SignInResponse response = new SignInResponse(userAccount.getId(), refreshTokenValue, accessTokenValue);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<SignUpResponse> registerUser(@RequestBody @Valid SignUpRequest signUpRecord) {
        // check if username already exists in DB
        if (userAccountRepository.existsByUsername(signUpRecord.username())) {
            return new ResponseEntity<>(new SignUpResponse("Username is already taken.", null), HttpStatus.BAD_REQUEST);
        }

        // check if email already exists in DB
        if (userAccountRepository.existsByEmail(signUpRecord.email())) {
            return new ResponseEntity<>(new SignUpResponse("Email is already taken.", null), HttpStatus.BAD_REQUEST);
        }

        // finished checking, now create user object
        UserAccount userAccount = UserAccount.builder()
                .username(signUpRecord.username())
                .email(signUpRecord.email())
                .password(passwordEncoder.encode(signUpRecord.password()))
                .build();

        userAccountRepository.save(userAccount);

        return new ResponseEntity<>(new SignUpResponse("User registered successfully.", userAccount.getId()), HttpStatus.OK);
    }

    @PostMapping(value = "/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        // get user
        UserAccount user = userAccountRepository.findById(changePasswordRequest.id()).orElseThrow(() ->
                new UsernameNotFoundException("User not found"));
        return null;
    }
}
