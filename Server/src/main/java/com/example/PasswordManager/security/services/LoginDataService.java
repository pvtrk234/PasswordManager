package com.example.PasswordManager.security.services;

import com.example.PasswordManager.models.LoginData;
import com.example.PasswordManager.repositories.LoginDataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LoginDataService {
    @Autowired
    private LoginDataRepository repository;

    public List<LoginData> getAllEntries(String userId) {
        return repository.findByUserId(userId);
    }

    public List<LoginData> getEntriesByType(String userId, String type) {
        return repository.findByUserIdAndType(userId, type);
    }

    public List<LoginData> getFavoriteEntries(String userId) {
        return repository.findByUserIdAndFavorite(userId, true);
    }

    public LoginData createEntry(LoginData entry) {
        return repository.save(entry);
    }

    public LoginData updateEntry(LoginData entry) {
        return repository.save(entry);
    }

    public LoginData getEntryByIdAndUserId(String id, String userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public void deleteEntry(LoginData entry) {
        repository.delete(entry);
    }
}
