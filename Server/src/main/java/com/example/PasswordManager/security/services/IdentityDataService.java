package com.example.PasswordManager.security.services;

import com.example.PasswordManager.models.Identity;
import com.example.PasswordManager.repositories.IdentityDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdentityDataService {
    @Autowired
    private IdentityDataRepository repository;

    public List<Identity> getAllEntries(String userId) {
        return repository.findByUserId(userId);
    }

    public List<Identity> getEntriesByType(String userId, String type) {
        return repository.findByUserIdAndType(userId, type);
    }

    public List<Identity> getFavoriteEntries(String userId) {
        return repository.findByUserIdAndFavorite(userId, true);
    }

    public Identity createEntry(Identity entry) {
        return repository.save(entry);
    }

    public Identity updateEntry(Identity entry) {
        return repository.save(entry);
    }
    public Identity getEntryByIdAndUserId(String id, String userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public void deleteEntry(Identity entry) {
        repository.delete(entry);
    }
}
