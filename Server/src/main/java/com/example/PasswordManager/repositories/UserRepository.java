package com.example.PasswordManager.repositories;

import java.util.Optional;
import com.example.PasswordManager.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}