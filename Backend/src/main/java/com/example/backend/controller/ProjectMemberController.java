package com.example.backend.controller;

import com.example.backend.service.ProjectMemberService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/member")
public class ProjectMemberController {
    @Autowired
    private ProjectMemberService projectMemberService;

    @Operation(description = "Remove a member")
    @DeleteMapping(value = "/")
    public ResponseEntity<String> delete(Long id) {
        projectMemberService.delete(id);
        return ResponseEntity.ok("Done");
    }

    @Operation(description = "Check if a member is an admin. Return true if they are an admin")
    @GetMapping(value = "/{memberId}/isAdmin")
    public ResponseEntity<Boolean> isAdmin(@PathVariable Long memberId) {
        return new ResponseEntity<>(projectMemberService.isAdmin(memberId), HttpStatus.OK);
    }
}
