package com.example.backend.service;

import com.example.backend.model.UserAccount;
import com.example.backend.record.GetProjectRespone;
import com.example.backend.repository.UserAccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;

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
    public void delete(Long id) {
        userAccountRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountRepository.findUserAccountByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("User not found"));
        return new User(userAccount.getUsername(), userAccount.getPassword(), userAccount.getAuthorities());
    }

    public List<GetProjectRespone> getAllProjects(Long id) {

    }
}
