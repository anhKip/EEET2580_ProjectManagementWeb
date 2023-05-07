package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/project")
public class ProjectController {
    @Autowired
    private CrudService<Project> projectCrudService;

    @PostMapping(value = "/", consumes = "application/json")
    public Project create(@RequestBody Project project) {
        return projectCrudService.create(project);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Project retrieve(@PathVariable Long id) {
        return projectCrudService.retrieve(id);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public Project update(@RequestBody Project project) {
        return projectCrudService.update(project);
    }

    @DeleteMapping(value = "/")
    public String delete(Long id) {
        projectCrudService.delete(id);
        return "Done";
    }
}
