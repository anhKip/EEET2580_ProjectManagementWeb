package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.record.CreateTaskRequest;
import com.example.backend.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/task")
public class TaskController {
    @Autowired
    private CrudService<Task> taskCrudService;

    @PostMapping(value = "/", consumes = "application/json")
    public Task create(@RequestBody Task task) {
        return taskCrudService.create(task);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public Task retrieve(@PathVariable Long id) {
        return taskCrudService.retrieve(id);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public Task update(@RequestBody Task task) {
        return taskCrudService.update(task);
    }

    @DeleteMapping(value = "/")
    public String delete(Long id) {
        taskCrudService.delete(id);
        return "Done";
    }
}
