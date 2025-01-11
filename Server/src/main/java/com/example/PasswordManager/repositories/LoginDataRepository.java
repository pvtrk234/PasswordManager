package com.example.PasswordManager.repositories;

import com.example.PasswordManager.models.LoginData;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LoginDataRepository extends MongoRepository<LoginData, String> {
    List<LoginData> findByUserId(String userId);
    List<LoginData> findByUserIdAndType(String userId, String type);
    List<LoginData> findByUserIdAndFavorite(String userId, boolean favorite);
    LoginData findByIdAndUserId(String id, String userId);
}