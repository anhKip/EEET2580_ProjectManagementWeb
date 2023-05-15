package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.UserAccount;
import com.example.backend.record.CreateProjectRecord;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.UserAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService implements CrudService<Project> {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;


    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project create(Project project) {
        return null;
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

    public Project create(CreateProjectRecord createProjectRecord) {
        Project project = new Project();
        project.setName(createProjectRecord.name());

        List<UserAccount> users = new ArrayList<>();
        users.add(userAccountRepository.findById(createProjectRecord.userId()).orElseThrow(() -> new UsernameNotFoundException("Cannot find user")));
        project.setUsers(users);

        return projectRepository.save(project);
    }
}
