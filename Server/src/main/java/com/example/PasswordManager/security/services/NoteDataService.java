package com.example.PasswordManager.security.services;

import com.example.PasswordManager.models.Note;
import com.example.PasswordManager.repositories.NoteDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteDataService {
    @Autowired
    private NoteDataRepository repository;

    public List<Note> getAllEntries(String userId) {
        return repository.findByUserId(userId);
    }

    public List<Note> getEntriesByType(String userId, String type) {
        return repository.findByUserIdAndType(userId, type);
    }

    public List<Note> getFavoriteEntries(String userId) {
        return repository.findByUserIdAndFavorite(userId, true);
    }

    public Note createEntry(Note entry) {
        return repository.save(entry);
    }

    public Note updateEntry(Note entry) {
        return repository.save(entry);
    }

    public Note getEntryByIdAndUserId(String id, String userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public void deleteEntry(Note entry) {
        repository.delete(entry);
    }
}
