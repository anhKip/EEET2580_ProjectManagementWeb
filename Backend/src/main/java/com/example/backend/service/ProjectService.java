package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.ProjectMember;
import com.example.backend.model.UserAccount;
import com.example.backend.record.CreateProjectRequest;
import com.example.backend.record.GetMemberResponse;
import com.example.backend.record.GetProjectRespone;
import com.example.backend.repository.ProjectMemberRepository;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserAccountRepository;
import jakarta.persistence.EntityManager;
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
    private EntityManager entityManager;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectMemberRepository projectMemberRepository;
    @Autowired
    private UserAccountRepository userAccountRepository;
    @Autowired
    private TaskRepository taskRepository;

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
    public String delete(Long id) {
        Project project = projectRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + id));
        projectRepository.deleteById(id);
        return "Done";
    }

    public String createProject(CreateProjectRequest createProjectRequest) {
        Project project = new Project();
        project.setName(createProjectRequest.name());

        List<ProjectMember> members = new ArrayList<>();
        UserAccount user = userAccountRepository.findById(createProjectRequest.userId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user with id " + createProjectRequest.userId()));
        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .isAdmin(true)
                .score(0)
                .build();
        user.getMemberships().add(member);
        members.add(member);
        project.setMembers(members);
//        projectMemberRepository.save(member);
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
            members.add(new GetMemberResponse(member.getId(), member.getUser().getId(), member.getUser().getUsername(), member.getScore()));
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
        // check if user is already a member
        if (!projectMemberRepository.findByUserIdAndProjectId(user.getId(), projectId).isEmpty())
            return "This user is already a member.";
        // create and set data for member
        ProjectMember newMember = ProjectMember.builder()
                .project(project)
                .user(user)
                .isAdmin(false)
                .score(0)
                .build();
        System.out.println(newMember);
        // add to project table
        project.getMembers().add(newMember);
        // saving project
//        projectRepository.save(project);
        projectMemberRepository.save(newMember);

        return "Member has been added";
    }

    public String removeMember(Long projectId, Long memberId) {
        // get project
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + projectId));
        ProjectMember member = projectMemberRepository.findByMemberIdAndProjectId(memberId, projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find member in this project with id " + projectId));
        projectMemberRepository.deleteById(memberId);
        return "Member has been removed";
    }

    public String changeName(Long projectId, String newName) {
        // get project
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + projectId));
        project.setName(newName);
        projectRepository.save(project);
        return "Project's name has been updated.";
    }
}
