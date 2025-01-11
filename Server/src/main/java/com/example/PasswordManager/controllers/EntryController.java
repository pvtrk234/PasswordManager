package com.example.PasswordManager.controllers;

import com.example.PasswordManager.models.Identity;
import com.example.PasswordManager.models.Note;
import com.example.PasswordManager.models.entries.Entry;
import com.example.PasswordManager.models.LoginData;
import com.example.PasswordManager.models.CreditCard;
import com.example.PasswordManager.security.services.IdentityDataService;
import com.example.PasswordManager.security.services.LoginDataService;
import com.example.PasswordManager.security.services.CreditCardDataService;
import com.example.PasswordManager.security.services.NoteDataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class EntryController {
    @Autowired
    private LoginDataService loginDataService;

    @Autowired
    private CreditCardDataService creditCardDataService;

    @Autowired
    private IdentityDataService identityDataService;

    @Autowired
    private NoteDataService noteDataService;

    @GetMapping("entries")
    @PreAuthorize("hasRole('USER')")
    public List<? extends Entry> getEntries(@RequestParam String userId, @RequestParam(required = false) String type) {
        if (type == null) {
            List<Entry> allEntries = new ArrayList<>();
            allEntries.addAll(loginDataService.getAllEntries(userId));
            allEntries.addAll(creditCardDataService.getAllEntries(userId));
            allEntries.addAll(identityDataService.getAllEntries(userId));
            allEntries.addAll(noteDataService.getAllEntries(userId));
            return allEntries;
        } else if (type.equals("favorite")) {
            List<Entry> favoriteEntries = new ArrayList<>();
            favoriteEntries.addAll(loginDataService.getFavoriteEntries(userId));
            favoriteEntries.addAll(creditCardDataService.getFavoriteEntries(userId));
            favoriteEntries.addAll(identityDataService.getFavoriteEntries(userId));
            favoriteEntries.addAll(noteDataService.getFavoriteEntries(userId));
            return favoriteEntries;
        } else if (type.equals("loginData")) {
            return loginDataService.getEntriesByType(userId, type);
        } else if (type.equals("creditCard")) {
            return creditCardDataService.getEntriesByType(userId, type);
        } else if (type.equals("identity")) {
            return identityDataService.getEntriesByType(userId, type);
        } else if (type.equals("note")) {
            return noteDataService.getEntriesByType(userId, type);
        } else {
            // Handle other types
            return List.of();
        }
    }

    @PostMapping("entries")
    @PreAuthorize("hasRole('USER')")
    public Entry createEntry(@RequestParam String userId, @RequestBody Entry entry) {
        if (entry instanceof LoginData) {
            return loginDataService.createEntry((LoginData) entry);
        } else if (entry instanceof CreditCard) {
            return creditCardDataService.createEntry((CreditCard) entry);
        } else if (entry instanceof Identity) {
            return identityDataService.createEntry((Identity) entry);
        } else if (entry instanceof Note) {
            return noteDataService.createEntry((Note) entry);
        } else {
            throw new IllegalArgumentException("Unsupported entry type");
        }
    }

    @PutMapping("entries")
    @PreAuthorize("hasRole('USER')")
    public Entry updateEntry(@RequestParam String userId, @RequestParam String itemId, @RequestBody Entry entry) {
        if (entry instanceof LoginData) {
            LoginData loginData = (LoginData) entry;
            loginData.setId(itemId);
            loginData.setUserId(userId);
            return loginDataService.updateEntry(loginData);
        } else if (entry instanceof CreditCard) {
            CreditCard creditCard = (CreditCard) entry;
            creditCard.setId(itemId);
            creditCard.setUserId(userId);
            return creditCardDataService.updateEntry(creditCard);
        } else if (entry instanceof Identity) {
            Identity identity = (Identity) entry;
            identity.setId(itemId);
            identity.setUserId(userId);
            return identityDataService.updateEntry(identity);
        } else if (entry instanceof Note) {
            Note note = (Note) entry;
            note.setId(itemId);
            note.setUserId(userId);
            return noteDataService.updateEntry(note);
        } else {
            throw new IllegalArgumentException("Unsupported entry type");
        }
    }

    @DeleteMapping("entries")
    @PreAuthorize("hasRole('USER')")
    public void deleteEntry(@RequestParam String userId, @RequestParam String itemId) {

        Entry entry = null;
        entry = loginDataService.getEntryByIdAndUserId(itemId, userId);
        if (entry == null) {
            entry = creditCardDataService.getEntryByIdAndUserId(itemId, userId);
        }
        if (entry == null) {
            entry = identityDataService.getEntryByIdAndUserId(itemId, userId);
        }
        if (entry == null) {
            entry = noteDataService.getEntryByIdAndUserId(itemId, userId);
        }
        
        if (entry != null) {
            if (entry instanceof LoginData) {
                loginDataService.deleteEntry((LoginData) entry);
            } else if (entry instanceof CreditCard) {
                creditCardDataService.deleteEntry((CreditCard) entry);
            } else if (entry instanceof Identity) {
                identityDataService.deleteEntry((Identity) entry);
            } else if (entry instanceof Note) {
                noteDataService.deleteEntry((Note) entry);
            }
        } else {
            throw new IllegalArgumentException("Entry not found");
        }
    }
}
