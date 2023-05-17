package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.ProjectMember;
import com.example.backend.model.UserAccount;
import com.example.backend.record.CreateProjectRecord;
import com.example.backend.repository.ProjectMemberRepository;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.UserAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class ProjectService implements CrudService<Project> {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectMemberRepository projectMemberRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;

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
        projectDb.setMembers(project.getMembers());
        projectDb.setTasks(project.getTasks());
        projectDb.setFiles(project.getFiles());

        return projectRepository.save(projectDb);
    }

    @Override
    public void delete(Long id) {
        projectRepository.deleteById(id);
    }

    public Project create(CreateProjectRecord createProjectRecord) {
        Project project = new Project();
        project.setName(createProjectRecord.name());

        List<ProjectMember> members = new ArrayList<>();
        ProjectMember member = new ProjectMember();
        UserAccount user = userAccountRepository.findById(createProjectRecord.userId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user with id " + createProjectRecord.userId()));
        member.setProject(project);
        member.setUser(user);
        member.setIsAdmin(true);
        member.setScore(0);
        user.getMemberships().add(member);

        members.add(member);
        project.setMembers(members);

        return projectRepository.save(project);
    }
}
