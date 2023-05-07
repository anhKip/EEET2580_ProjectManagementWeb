package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService implements CrudService<Project> {
    @Autowired
    private ProjectRepository projectRepository;


    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project create(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project retrieve(Long id) {
        return projectRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + id));
    }

    @Override
    public Project update(Project project) {
        Project projectDb = projectRepository.findById(project.getId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + project.getId()));
        projectDb.setName(project.getName());
        projectDb.setUsers(project.getUsers());

        return projectRepository.save(projectDb);
    }

    @Override
    public void delete(Long id) {
        projectRepository.deleteById(id);
    }
}
