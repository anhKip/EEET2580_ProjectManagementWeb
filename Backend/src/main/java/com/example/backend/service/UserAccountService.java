package com.example.backend.service;

import com.example.backend.model.ProjectMember;
import com.example.backend.model.UserAccount;
import com.example.backend.record.GetProjectRespone;
import com.example.backend.record.UpdateUserRequest;
import com.example.backend.repository.UserAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserAccountService implements CrudService<UserAccount>, UserDetailsService {
    @Autowired
    private UserAccountRepository userAccountRepository;

    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    @Override
    public UserAccount create(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }

    @Override
    public UserAccount retrieve(Long id) {
        return userAccountRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user account with id " + id));
    }

    @Override
    public UserAccount update(UserAccount userAccount) {
        UserAccount userAccountDb = userAccountRepository.findById(userAccount.getId()).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user account with id " + userAccount.getId()));
        userAccountDb.setUsername(userAccount.getUsername());
        userAccountDb.setEmail(userAccount.getEmail());
        userAccountDb.setPassword(userAccount.getPassword());

        return userAccountRepository.save(userAccountDb);
    }

    @Override
    public String delete(Long id) {
        userAccountRepository.deleteById(id);
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountRepository.findUserAccountByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("User not found"));
        return new User(userAccount.getUsername(), userAccount.getPassword(), userAccount.getAuthorities());
    }

    public String updateUser(Long userId, UpdateUserRequest request) {
        UserAccount userAccount = userAccountRepository.findById(userId).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user account with id " + userId));
        userAccount.setEmail(request.email());
        userAccount.setUsername(request.username());
        userAccount.setDescription(request.description());
        userAccountRepository.save(userAccount);
        return "User info has been updated";
    }

    public List<GetProjectRespone> getAllProjects(Long id) {
        UserAccount userAccount = userAccountRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cannot find user account with id " + id));
        List<GetProjectRespone> projects = new ArrayList<>();
        for (ProjectMember membership : userAccount.getMemberships()) {
            projects.add(new GetProjectRespone(membership.getProject().getId(), membership.getProject().getName()));
        }
        return projects;
    }
}
