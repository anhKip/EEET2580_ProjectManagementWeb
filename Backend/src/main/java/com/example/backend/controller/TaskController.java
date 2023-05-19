package com.example.backend.controller;

import com.example.backend.model.Status;
import com.example.backend.model.Task;
import com.example.backend.record.AssignTaskRequest;
import com.example.backend.record.CreateTaskRequest;
import com.example.backend.record.GetTaskResponse;
import com.example.backend.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @Operation(description = "Create a task. Note: The JSON date format is yyyy-MM-dd'T'HH:mm")
    @PostMapping(value = "/{projectId}", consumes = "application/json")
    public ResponseEntity<String> create(@PathVariable Long projectId, @RequestBody CreateTaskRequest createTaskRequest) {
        return new ResponseEntity<>(taskService.create(projectId, createTaskRequest), HttpStatus.OK);
    }

    @Operation(description = "Get a task by id. NOTE: *** If assignedTo == 0, task has not been assigned to anyone!!! ***")
    @GetMapping(value = "/{taskId}", produces = "application/json")
    public ResponseEntity<GetTaskResponse> retrieve(@PathVariable Long taskId) {
        Task task = taskService.retrieve(taskId);
        GetTaskResponse response = new GetTaskResponse(taskId, task.getName(), task.getDeadline(), task.getDetail(),
                task.getPriority(), task.getStatus(), task.getAssignedTo() == null ? 0 : task.getAssignedTo().getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(description = "Update a task")
    @PutMapping(value = "/{taskId}", consumes = "application/json")
    public ResponseEntity<String> update(@PathVariable Long taskId, @RequestBody CreateTaskRequest createTaskRequest) {
        return new ResponseEntity<>(taskService.update(taskId, createTaskRequest), HttpStatus.OK);
    }

    @Operation(description = "Delete a task by id")
    @DeleteMapping(value = "/{taskId}")
    public ResponseEntity<String> delete(@PathVariable Long taskId) {
        taskService.delete(taskId);
        return new ResponseEntity<>("Done", HttpStatus.OK);
    }

    @Operation(description = "Assign a task to user")
    @PostMapping(value = "/{taskId}/assign")
    public ResponseEntity<String> assignTask(@PathVariable Long taskId, @RequestBody AssignTaskRequest assignTaskRequest) {
        return new ResponseEntity<>(taskService.assignTask(taskId, assignTaskRequest), HttpStatus.OK);
    }

    @Operation(description = "Get all tasks of a project")
    @GetMapping(value = "/pId={projectId}", produces = "application/json")
    public ResponseEntity<List<GetTaskResponse>> getAllTasks(@PathVariable Long projectId) {
        return new ResponseEntity<>(taskService.getAllTasks(projectId), HttpStatus.OK);
    }

    @Operation(description = "Change status of task")
    @PostMapping(value = "/{taskId}/{status}")
    public ResponseEntity<String> changeStatus(@PathVariable Long taskId, @PathVariable Status status) {
        return new ResponseEntity<>(taskService.changeStatus(taskId, status), HttpStatus.OK);
    }
}
