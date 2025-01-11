package com.example.PasswordManager.models.entries;

import com.example.PasswordManager.models.CreditCard;
import com.example.PasswordManager.models.LoginData;
import com.example.PasswordManager.models.Identity;
import com.example.PasswordManager.models.Note;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = LoginData.class, name = "loginData"),
        @JsonSubTypes.Type(value = CreditCard.class, name = "creditCard"),
        @JsonSubTypes.Type(value = Identity.class, name = "identity"),
        @JsonSubTypes.Type(value = Note.class, name = "note")
})
public interface Entry {
    String getType();
    String getUserId();
}
