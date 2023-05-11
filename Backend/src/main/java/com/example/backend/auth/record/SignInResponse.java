package com.example.backend.auth.record;

public record SignInResponse(
        Long userId,
        String refreshToken,
        String accessToken
) {
}
