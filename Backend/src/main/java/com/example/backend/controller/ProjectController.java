package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.record.CreateProjectRecord;
import com.example.backend.repository.ProjectMemberRepository;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> create(@RequestBody CreateProjectRecord createProjectRecord) {
        System.out.println("Test: inside create project controller");
        System.out.println(createProjectRecord);
        try{
            projectService.create(createProjectRecord);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity("An error has occured.", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("Project has been created.");
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Project retrieve(@PathVariable Long id) {
        return projectService.retrieve(id);
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
}
