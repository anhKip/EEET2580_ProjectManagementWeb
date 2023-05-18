package com.example.backend.service;

import com.example.backend.model.ProjectMember;
import com.example.backend.repository.ProjectMemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class ProjectMemberService implements CrudService<ProjectMember> {
    private ProjectMemberRepository projectMemberRepository;

    @Override
    public ProjectMember create(ProjectMember projectMember) {
        return null;
    }

    @Override
    public ProjectMember retrieve(Long id) {
        return projectMemberRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find member with id " + id));
    }

    @Override
    public ProjectMember update(ProjectMember projectMember) {
        ProjectMember memberDb = projectMemberRepository.findById(projectMember.getId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find member with id " + projectMember.getId()));
        memberDb.setScore(projectMember.getScore());
        memberDb.setIsAdmin(projectMember.getIsAdmin());
        memberDb.setTasks(projectMember.getTasks());
//        memberDb.setProject(projectMember.getProject());
        return projectMemberRepository.save(memberDb);
    }

    @Override
    public void delete(Long id) {
        projectMemberRepository.deleteById(id);
    }

    public Boolean isAdmin(Long memberId) {
        ProjectMember projectMember = projectMemberRepository.findById(memberId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find member with id " + memberId));
        return projectMember.getIsAdmin();
    }
}
