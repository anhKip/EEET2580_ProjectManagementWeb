package com.example.backend.controller;

import com.example.backend.record.*;
import com.example.backend.repository.ProjectMemberRepository;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("api/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ProjectMemberRepository projectMemberRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;

    @Operation(description = "Create a project")
    @PostMapping(value = "/", consumes = "application/json")
    public ResponseEntity<String> create(@RequestBody @Valid CreateProjectRequest createProjectRequest) {
        return new ResponseEntity<>(projectService.createProject(createProjectRequest), HttpStatus.OK);
    }

    @Operation(description = "Get a project by project id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<GetProjectRespone> retrieve(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getProject(id), HttpStatus.OK);
    }

//    @PutMapping(value = "/", consumes = "application/json")
//    public Project update(@RequestBody Project project) {
//        return projectService.update(project);
//    }

    @Operation(description = "Delete a project by project id")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.delete(id), HttpStatus.OK);
    }

    @Operation(description = "Get all members of a project")
    @GetMapping(value = "/{projectId}/members", produces = "application/json")
    public ResponseEntity<List<GetMemberResponse>> getMembers(@PathVariable Long projectId) {
        return new ResponseEntity<>(projectService.getMembers(projectId), HttpStatus.OK);
    }

    @Operation(description = "Add a member to a project")
    @PostMapping(value = "/{projectId}/add-member", consumes = "application/json")
    public ResponseEntity<String> addMember(@PathVariable Long projectId, @RequestBody @Valid AddMemberRequest addMemberRequest) {
        return new ResponseEntity<>(projectService.addMember(projectId, addMemberRequest.username()), HttpStatus.OK);
    }

    @Operation(description = "Remove a member from a project")
    @PostMapping(value = "/{projectId}/remove-member/{memberId}")
    public ResponseEntity<String> removeMember(@PathVariable Long projectId, @PathVariable Long memberId) {
        return new ResponseEntity<>(projectService.removeMember(projectId, memberId), HttpStatus.OK);
    }

    @Operation(description = "Change a project name")
    @PostMapping(value = "/{projectId}/change-name", consumes = "application/json")
    public ResponseEntity<String> changeName(@PathVariable Long projectId, @RequestBody @Valid ChangeProjectNameRequest request) {
        return new ResponseEntity<>(projectService.changeName(projectId, request.newName()), HttpStatus.OK);
    }
}
