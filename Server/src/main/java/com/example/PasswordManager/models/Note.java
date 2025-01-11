package com.example.PasswordManager.models;

import com.example.PasswordManager.models.entries.Entry;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "note")
public class Note implements Entry {
    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String type = "note";

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    private String note;

    private boolean favorite;

    public Note() {
    }

    public Note(String userId, String type, String name, String note, Boolean favorite) {
        this.userId = userId;
        this.type = type;
        this.name = name;
        this.note = note;
        this.favorite = favorite;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    @Override
    public String toString() {
        return "CreditCard{" +
                "id='" + id + '\'' +
                ", UserId='" + userId + '\'' +
                ", Typ='" + type + '\'' +
                ", Nazwa='" + name + '\'' +
                ", Notatka='" + note + '\'' +
                ", favorite=" + favorite +
                '}';
    }
}