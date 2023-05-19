package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.Update;
import com.example.backend.repository.GetUpdateResponse;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.UpdateRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UpdateService implements CrudService<Update> {
    @Autowired
    private UpdateRepository updateRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Update create(Update update) {
        return updateRepository.save(update);
    }

    @Override
    public Update retrieve(Long id) {
        return updateRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find update by id " + id)
        );
    }

    @Override
    public Update update(Update update) {
        Update updateDb = updateRepository.findById(update.getId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find update by id " + update.getId())
        );
        updateDb.setMessage(update.getMessage());
        updateDb.setDate(update.getDate());
        return updateRepository.save(updateDb);
    }

    @Override
    public String delete(Long id) {
        Update update = updateRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find update by id " + id)
        );
        updateRepository.deleteById(id);
        return "Done";
    }

    public List<GetUpdateResponse> getUpdates(Long projectId) {
        // get project
        Project project = projectRepository.findById(projectId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + projectId));
        // build response
        List<GetUpdateResponse> responses = new ArrayList<>();
        List<Update> updates = updateRepository.findTop7ByDateOrderByDateDateDesc();
        for (Update update : updates) {
            responses.add(new GetUpdateResponse(update.getMessage(), update.getDate()));
        }
        return responses;
    }

}
