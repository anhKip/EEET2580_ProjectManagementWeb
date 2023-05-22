package com.example.backend.service;

import com.example.backend.exception.FileStorageException;
import com.example.backend.model.File;
import com.example.backend.repository.FileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class FileService implements CrudService<File> {
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

    public File storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            LocalDateTime now = LocalDateTime.now();
            File dbFile = File.builder()
                    .name(fileName)
                    .uploadDate(now)
                    .fileType(file.getContentType())
                    .data(file.getBytes()).build();

            return fileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public File getFile(Long fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("Cannot find file with id " + fileId));
    }
}
