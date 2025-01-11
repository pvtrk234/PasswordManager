package com.example.PasswordManager.models;

import com.example.PasswordManager.models.entries.Entry;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "loginData")
public class LoginData implements Entry {
    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String type = "loginData";

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    private String username;

    @NotBlank
    @Size(max = 120)
    private String password;

    @NotBlank
    private String uri;

    @NotBlank
    private String note;

    private boolean favorite;

    public LoginData() {
    }

    public LoginData(String userId, String type, String name, String username, String password, String uri, String note, boolean favorite) {
        this.userId = userId;
        this.type = type;
        this.name = name;
        this.username = username;
        this.password = password;
        this.uri = uri;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getURI() {
        return uri;
    }

    public void setURI(String uri) {
        this.uri = uri;
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
        return "LoginData{" +
                "id='" + id + '\'' +
                ", UserId='" + userId + '\'' +
                ", Typ='" + type + '\'' +
                ", Nazwa='" + name + '\'' +
                ", Nazwa użytkownika='" + username + '\'' +
                ", Hasło='" + password + '\'' +
                ", URI='" + uri + '\'' +
                ", Notatka='" + note + '\'' +
                ", favorite=" + favorite +
                '}';
    }
}