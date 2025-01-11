package com.example.PasswordManager.repositories;

import com.example.PasswordManager.models.CreditCard;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CreditCardDataRepository extends MongoRepository<CreditCard, String> {
    List<CreditCard> findByUserId(String userId);
    List<CreditCard> findByUserIdAndType(String userId, String type);
    List<CreditCard> findByUserIdAndFavorite(String userId, boolean favorite);
    CreditCard findByIdAndUserId(String id, String userId);
}
