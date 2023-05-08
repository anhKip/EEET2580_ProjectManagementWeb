package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService implements CrudService<Task>{
    @Autowired
    private TaskRepository taskRepository;

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
        taskDb.setLabel(task.getLabel());
        taskDb.setDeadline(task.getDeadline());
        taskDb.setDetail(task.getDetail());
        taskDb.setPriority(task.getPriority());
        taskDb.setCompleted(task.getCompleted());
        taskDb.setAssignedTo(task.getAssignedTo());
        return taskRepository.save(taskDb);
    }

    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}
