package com.example.PasswordManager.models;

import com.example.PasswordManager.models.entries.Entry;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "creditCard")
public class CreditCard implements Entry {
    @Id
    private String id;

    @NotBlank
    private String userId;

    @NotBlank
    private String type = "creditCard";

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    private String cardOwner;

    @NotBlank
    private String cardNumber;

    @NotBlank
    private String issuer;

    @NotBlank
    private String expiryMonth;

    @NotBlank
    @Size(max = 4)
    private int expiryYear;

    @NotBlank
    private String securityCode;

    @NotBlank
    private String note;

    private boolean favorite;

    public CreditCard() {
    }

    public CreditCard(String userId, String type, String name, String cardOwner, String issuer, String cardNumber, String expiryMonth, int expiryYear, String securityCode, String note, Boolean favorite) {
        this.userId = userId;
        this.type = type;
        this.name = name;
        this.cardOwner = cardOwner;
        this.issuer = issuer;
        this.cardNumber = cardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.securityCode = securityCode;
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

    // Właściciel karty
    public String getCardOwner() {
        return cardOwner;
    }
    public void setCardOwner(String cardOwner) {
        this.cardOwner = cardOwner;
    }

    // Numer karty
    public String getCardNumber() {
        return cardNumber;
    }
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getIssuer() {
        return issuer;
    }
    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    // Miesiąc wygaśnięcia
    public String getExpiryMonth() {
        return expiryMonth;
    }
    public void setExpiryMonth(String expiryMonth) {
        this.expiryMonth = expiryMonth;
    }

    // Rok wygaśnięcia
    public int getExpiryYear() {
        return expiryYear;
    }
    public void setExpiryYear(int expiryYear) {
        this.expiryYear = expiryYear;
    }

    // Kod zabezpieczający
    public String getSecurityCode() {
        return securityCode;
    }
    public void setSecurityCode(String securityCode) {
        this.securityCode = securityCode;
    }

    public String getNote() { return note; }

    public void setNote(String note) { this.note = note; }

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
                ", Właściciel karty='" + cardOwner + '\'' +
                ", Wydawca='" + issuer + '\'' +
                ", Numer karty='" + cardNumber + '\'' +
                ", Miesiąc wygaśniecia='" + expiryMonth + '\'' +
                ", Rok wygaśnięcia='" + expiryYear + '\'' +
                ", Kod zabezpieczający='" + securityCode + '\'' +
                ", favorite=" + favorite +
                '}';
    }
}