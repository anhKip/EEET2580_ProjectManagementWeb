package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.model.ProjectMember;
import com.example.backend.record.*;
import com.example.backend.repository.ProjectMemberRepository;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.service.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import net.minidev.json.JSONObject;
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

    @PostMapping(value = "/", consumes = "application/json")
    public ResponseEntity<String> create(@RequestBody @Valid CreateProjectRequest createProjectRequest) {
        return new ResponseEntity<>(projectService.createProject(createProjectRequest), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<GetProjectRespone> retrieve(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getProject(id), HttpStatus.OK);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public Project update(@RequestBody Project project) {
        return projectService.update(project);
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Long id) {
        projectService.delete(id);
        return "Done";
    }

    @GetMapping(value = "/{projectId}/members", produces = "application/json")
    public ResponseEntity<List<GetMemberResponse>> getMembers(@PathVariable Long projectId) {
        return new ResponseEntity<>(projectService.getMembers(projectId), HttpStatus.OK);
    }

    @PostMapping(value = "/{projectId}/add-member", consumes = "application/json")
    public ResponseEntity<String> addMember(@PathVariable Long projectId, @RequestBody @Valid AddMemberRequest addMemberRequest) {
        return new ResponseEntity<>(projectService.addMember(projectId, addMemberRequest.username()), HttpStatus.OK);
    }

    @PostMapping(value = "/{projectId}/remove-member/{memberId}")
    public ResponseEntity<String> removeMember(@PathVariable Long projectId, @PathVariable Long memberId) {
        return new ResponseEntity<>(projectService.removeMember(projectId, memberId), HttpStatus.OK);
    }

    @PostMapping(value = "/{projectId}/change-name", consumes = "application/json")
    public ResponseEntity<String> changeName(@PathVariable Long projectId, @RequestBody @Valid ChangeProjectNameRequest request) {
        return new ResponseEntity<>(projectService.changeName(projectId, request.newName()), HttpStatus.OK);
    }
}
