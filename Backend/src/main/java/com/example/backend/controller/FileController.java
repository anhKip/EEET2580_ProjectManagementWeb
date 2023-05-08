package com.example.backend.controller;

import com.example.backend.model.File;
import com.example.backend.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/file")
public class FileController {
    @Autowired
    private CrudService<File> fileCrudService;

    @PostMapping(value = "/", consumes = "application/json")
    public File create(@RequestBody File file) {
        return fileCrudService.create(file);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public File retrieve(@PathVariable Long id) {
        return fileCrudService.retrieve(id);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public File update(@RequestBody File file) {
        return fileCrudService.update(file);
    }

    @DeleteMapping(value = "/")
    public String delete(Long id) {
        fileCrudService.delete(id);
        return "Done";
    }
}
