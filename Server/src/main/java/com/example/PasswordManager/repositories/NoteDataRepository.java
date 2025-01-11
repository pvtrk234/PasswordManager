package com.example.PasswordManager.repositories;

import com.example.PasswordManager.models.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoteDataRepository extends MongoRepository<Note, String> {
    List<Note> findByUserId(String userId);
    List<Note> findByUserIdAndType(String userId, String type);
    List<Note> findByUserIdAndFavorite(String userId, boolean favorite);
    Note findByIdAndUserId(String id, String userId);
}
