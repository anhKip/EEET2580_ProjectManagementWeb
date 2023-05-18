package com.example.backend.controller;

import com.example.backend.model.ProjectMember;
import com.example.backend.service.ProjectMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/member")
public class ProjectMemberController {
    private ProjectMemberService projectMemberService;

    @PostMapping(value = "/", consumes = "application/json")
    public ResponseEntity<?> create(@RequestBody ProjectMember projectMember) {
        projectMemberService.create(projectMember);
        return ResponseEntity.ok("Member has been created");
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> retrieve(@PathVariable Long id) {
        return ResponseEntity.ok(projectMemberService.retrieve(id));
    }

    @PutMapping(value = "/", consumes = "application/json")
    public ResponseEntity<?> update(@RequestBody ProjectMember projectMember) {
        return ResponseEntity.ok(projectMemberService.update(projectMember));
    }

    @DeleteMapping(value = "/")
    public ResponseEntity<?> delete (Long id) {
        projectMemberService.delete(id);
        return ResponseEntity.ok("Done");
    }
}