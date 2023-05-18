package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.ProjectMember;
import com.example.backend.model.UserAccount;
import com.example.backend.record.CreateProjectRequest;
import com.example.backend.record.GetMemberResponse;
import com.example.backend.record.GetProjectRespone;
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
//    @Autowired
//    private ProjectMemberRepository projectMemberRepository;
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

    public String createProject(CreateProjectRequest createProjectRequest) {
        Project project = new Project();
        project.setName(createProjectRequest.name());

        List<ProjectMember> members = new ArrayList<>();
        ProjectMember member = new ProjectMember();
        UserAccount user = userAccountRepository.findById(createProjectRequest.userId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user with id " + createProjectRequest.userId()));
        member.setProject(project);
        member.setUser(user);
        member.setIsAdmin(true);
        member.setScore(0);
        user.getMemberships().add(member);

        members.add(member);
        project.setMembers(members);
        projectRepository.save(project);

        return "Project has been created.";
    }

    public GetProjectRespone getProject(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + id));
        return new GetProjectRespone(project.getId(), project.getName());
    }

    public List<GetMemberResponse> getMembers(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + id));
        List<GetMemberResponse> members = new ArrayList<>();
        for (ProjectMember member : project.getMembers()) {
            members.add(new GetMemberResponse(member.getId(), member.getUser().getUsername(), member.getScore()));
        }
        return members;
    }

    public String addMember(Long projectId, String username) {
        // get project
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + projectId));
        // get user
        UserAccount user = userAccountRepository.findUserAccountByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user account with username " + username));
//        if(projectMemberRepository.isAlreadyMember(user.getId(), projectId))
//            return "This user is already a member.";
        // create and set data for member
        ProjectMember newMember = new ProjectMember();
        newMember.setProject(project);
        newMember.setUser(user);
        newMember.setIsAdmin(false);
        newMember.setScore(0);
        // add to user table
        user.getMemberships().add(newMember);
        // add to project table
        project.getMembers().add(newMember);
        // saving project
        projectRepository.save(project);

        return "Member has been added";
    }
}
