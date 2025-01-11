package com.example.PasswordManager.security.services;

import com.example.PasswordManager.models.CreditCard;
import com.example.PasswordManager.repositories.CreditCardDataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CreditCardDataService {
    @Autowired
    private CreditCardDataRepository repository;

    public List<CreditCard> getAllEntries(String userId) {
        return repository.findByUserId(userId);
    }

    public List<CreditCard> getEntriesByType(String userId, String type) {
        return repository.findByUserIdAndType(userId, type);
    }

    public List<CreditCard> getFavoriteEntries(String userId) {
        return repository.findByUserIdAndFavorite(userId, true);
    }

    public CreditCard createEntry(CreditCard entry) {
        return repository.save(entry);
    }

    public CreditCard updateEntry(CreditCard entry) {
        return repository.save(entry);
    }

    public CreditCard getEntryByIdAndUserId(String id, String userId) {
        return repository.findByIdAndUserId(id, userId);
    }

    public void deleteEntry(CreditCard entry) {
        repository.delete(entry);
    }
}
