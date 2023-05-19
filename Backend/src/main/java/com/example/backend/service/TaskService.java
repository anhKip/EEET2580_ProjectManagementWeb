package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.ProjectMember;
import com.example.backend.model.Status;
import com.example.backend.model.Task;
import com.example.backend.record.AssignTaskRequest;
import com.example.backend.record.CreateTaskRequest;
import com.example.backend.record.GetTaskResponse;
import com.example.backend.repository.ProjectMemberRepository;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService implements CrudService<Task> {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task create(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task retrieve(Long id) {
        return taskRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + id)
        );
    }

    @Override
    public Task update(Task task) {
        Task taskDb = taskRepository.findById(task.getId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + task.getId())
        );
        taskDb.setName(task.getName());
        taskDb.setDeadline(task.getDeadline());
        taskDb.setDetail(task.getDetail());
        taskDb.setPriority(task.getPriority());
        taskDb.setStatus(task.getStatus());
        taskDb.setAssignedTo(task.getAssignedTo());
        return taskRepository.save(taskDb);
    }

    @Override
    public void delete(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find task with id " + id));
        taskRepository.deleteById(id);
    }

    public String create(Long projectId, CreateTaskRequest createTaskRequest) {
        // get project
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + projectId));
        Task task = Task.builder()
                .project(project)
                .name(createTaskRequest.name())
                .priority(createTaskRequest.priority())
                .detail(createTaskRequest.detail())
                .deadline(createTaskRequest.deadline())
                .status(Status.TODO)
                .build();
        taskRepository.save(task);
        return "Task has been created";
    }

    public String update(Long taskId, CreateTaskRequest createTaskRequest) {
        Task taskDb = taskRepository.findById(taskId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + taskId)
        );
        taskDb.setName(createTaskRequest.name());
        taskDb.setDeadline(createTaskRequest.deadline());
        taskDb.setDetail(createTaskRequest.detail());
        taskDb.setPriority(createTaskRequest.priority());
        taskRepository.save(taskDb);
        return "Task has been updated";
    }

    public String assignTask(Long taskId, AssignTaskRequest assignTaskRequest) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find task with id " + taskId));
        ProjectMember projectMember = projectMemberRepository.findByUserIdAndProjectId(assignTaskRequest.userId(), assignTaskRequest.projectId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find member"));
        task.setAssignedTo(projectMember);
        taskRepository.save(task);

        return "Task has been assigned";
    }

    public List<GetTaskResponse> getAllTasks(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + projectId));
        List<GetTaskResponse> responses = new ArrayList<>();
        for (Task task : project.getTasks()) {
            GetTaskResponse response = GetTaskResponse.builder()
                    .taskId(task.getId())
                    .name(task.getName())
                    .deadline(task.getDeadline())
                    .detail(task.getDetail())
                    .priority(task.getPriority())
                    .status(task.getStatus())
                    .assignedTo(task.getAssignedTo() == null ? 0 : task.getAssignedTo().getId())
                    .build();
            responses.add(response);
        }
        return responses;
    }

    public String changeStatus(Long taskId, Status status) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find task with id " + taskId));
        task.setStatus(status);
        taskRepository.save(task);
        return "Task's status has been changed";
    }

    public String changeDeadline(Long taskId, Date deadline) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find task with id " + taskId));
        task.setDeadline(deadline);
        taskRepository.save(task);
        return "Task's deadline has been changed";
    }
}
