package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.record.CreateTaskRequest;
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

    @Operation(description = "Create a task. Note: The JSON date format is yyyy-MM-dd HH:mm:ss")
    @PostMapping(value = "/{projectId}", consumes = "application/json")
    public ResponseEntity<String> create(@PathVariable Long projectId, @RequestBody CreateTaskRequest createTaskRequest) {
        return new ResponseEntity<>(taskService.create(projectId, createTaskRequest), HttpStatus.OK);
    }

    @Operation(description = "Get a task by id")
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Task> retrieve(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.retrieve(id), HttpStatus.OK);
    }

    @Operation(description = "Update a task")
    @PutMapping(value = "/{taskId}", consumes = "application/json")
    public ResponseEntity<String> update(@PathVariable Long taskId, @RequestBody CreateTaskRequest createTaskRequest) {
        return new ResponseEntity<>(taskService.update(taskId, createTaskRequest), HttpStatus.OK);
    }

    @Operation(description = "Delete a task by id")
    @DeleteMapping(value = "/")
    public ResponseEntity<String> delete(Long id) {
        taskService.delete(id);
        return new ResponseEntity<>("Done", HttpStatus.OK);
    }

    @Operation(description = "Assign a task to user")
    @PostMapping(value = "/{taskId}/assign/{memberId}")
    public ResponseEntity<String> assignTask(@PathVariable Long taskId, @PathVariable Long memberId) {
        return new ResponseEntity<>(taskService.assignTask(taskId, memberId), HttpStatus.OK);
    }
}
