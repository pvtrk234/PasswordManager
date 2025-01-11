package com.example.PasswordManager.repositories;

import com.example.PasswordManager.models.Identity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IdentityDataRepository extends MongoRepository<Identity, String> {
    List<Identity> findByUserId(String userId);
    List<Identity> findByUserIdAndType(String userId, String type);
    List<Identity> findByUserIdAndFavorite(String userId, boolean favorite);
    Identity findByIdAndUserId(String id, String userId);
}
