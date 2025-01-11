package com.example.PasswordManager.models;

import com.example.PasswordManager.models.entries.Entry;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "identity")
public class Identity implements Entry {
    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String type = "identity";

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    private String title;

    @NotBlank
    private String firstName;

    @NotBlank
    private String middleName;

    @NotBlank
    private String lastName;

    @NotBlank
    private int socialSecurityNumber;

    @NotBlank
    private String passportNumber;

    @NotBlank
    private String licenseNumber;

    @NotBlank
    private String email;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    @NotBlank
    private String postalCode;

    @NotBlank
    private String country;

    private boolean favorite;

    public Identity() {
    }

    public Identity(String userId, String type, String name, String title, String firstName, String middleName, String lastName, int socialSecurityNumber, String passportNumber, String licenseNumber, String email, String phone, String address, String city, String state, String postalCode, String country, Boolean favorite) {
        this.userId = userId;
        this.type = type;
        this.name = name;
        this.title = title;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.socialSecurityNumber = socialSecurityNumber;
        this.passportNumber = passportNumber;
        this.licenseNumber = licenseNumber;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
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


    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    @Override
    public String toString() {
        return "Identity{" +
                "id='" + id + '\'' +
                ", UserId='" + userId + '\'' +
                ", Typ='" + type + '\'' +
                ", Nazwa='" + name + '\'' +
                ", Tytuł='" + title + '\'' +
                ", Imie='" + name + '\'' +
                ", Drugię imię='" + middleName + '\'' +
                ", Nazwisko='" + lastName + '\'' +
                ", Numer PESEL='" + socialSecurityNumber + '\'' +
                ", Numer paszportu ='" + passportNumber + '\'' +
                ", Numer prawa jazdy ='" + licenseNumber + '\'' +
                ", Adres e-mail ='" + email + '\'' +
                ", Telefon ='" + phone + '\'' +
                ", Adres ='" + address + '\'' +
                ", Miasto ='" + city + '\'' +
                ", Województwo ='" + state + '\'' +
                ", Kod pocztowy ='" + postalCode + '\'' +
                ", Państwo ='" + country + '\'' +
                ", favorite=" + favorite +
                '}';
    }
}