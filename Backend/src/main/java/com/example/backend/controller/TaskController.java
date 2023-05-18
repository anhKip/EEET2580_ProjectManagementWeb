package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.record.CreateTaskRequest;
import com.example.backend.service.CrudService;
import com.example.backend.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @Operation(description = "Create a task")
    @PostMapping(value = "/{projectId}", consumes = "application/json")
    public ResponseEntity<String> create(@PathVariable Long projectId, @RequestBody CreateTaskRequest createTaskRequest) {
        return new ResponseEntity<>(taskService.create(projectId, createTaskRequest), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Task retrieve(@PathVariable Long id) {
        return taskService.retrieve(id);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public Task update(@RequestBody Task task) {
        return taskService.update(task);
    }

    @DeleteMapping(value = "/")
    public String delete(Long id) {
        taskService.delete(id);
        return "Done";
    }
}
