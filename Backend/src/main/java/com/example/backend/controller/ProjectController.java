package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.record.AddMemberRequest;
import com.example.backend.record.CreateProjectRequest;
import com.example.backend.record.GetMemberResponse;
import com.example.backend.record.GetProjectRespone;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.service.ProjectService;
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
    //    @Autowired
//    private ProjectMemberRepository projectMemberRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;

    @PostMapping(value = "/", consumes = "application/json")
    public ResponseEntity<String> create(@RequestBody CreateProjectRequest createProjectRequest) {
        System.out.println("Test: inside createProject project controller");
        System.out.println(createProjectRequest);
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
    public ResponseEntity<String> addMember(@PathVariable Long projectId, @RequestBody AddMemberRequest addMemberRequest) {
        return new ResponseEntity<>(projectService.addMember(projectId, addMemberRequest.username()), HttpStatus.OK);
    }

    @PostMapping(value = "/{projectId}/remove-member/{memberId}")
    public ResponseEntity<String> removeMember(@PathVariable Long projectId, @PathVariable Long memberId) {
        return new ResponseEntity<>(projectService.removeMember(projectId, memberId), HttpStatus.OK);
    }
}
