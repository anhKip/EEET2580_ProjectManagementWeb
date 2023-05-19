package com.example.backend.service;

import com.example.backend.model.File;
import com.example.backend.repository.FileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService implements CrudService<File>{
    @Autowired
    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public File create(File file) {
        return fileRepository.save(file);
    }

    @Override
    public File retrieve(Long id) {
        return fileRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + id));
    }

    @Override
    public File update(File file) {
        File fileDb = fileRepository.findById(file.getId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find project with id " + file.getId()));
        fileDb.setName(file.getName());
//        fileDb.setUploadDate(file.getUploadDate());
        return fileRepository.save(fileDb);
    }

    @Override
    public String delete(Long id) {
        fileRepository.deleteById(id);
        return null;
    }
}
