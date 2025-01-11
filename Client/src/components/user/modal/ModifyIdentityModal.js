import React, { useState, useEffect } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBSelect, CDBBtn, CDBInput } from 'cdbreact';

import UserService from '../../../services/user.service';

function ModifyIdentityModal({ userId, entry, onEditEntry, closeModal }) {
  const [type] = useState('identity');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialSecurityNumber, setSocialSecurityNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    if (entry) {
      setName(entry.name || '');
      setTitle(entry.title | '');
      setFirstName(entry.firstName | '');
      setMiddleName(entry.middleName | '');
      setLastName(entry.lastName | '');
      setSocialSecurityNumber(entry.socialSecurityNumber | '');
      setPassportNumber(entry.passportNumber | '');
      setLicenseNumber(entry.licenseNumber | '');
      setEmail(entry.email | '');
      setPhone(entry.phone | '');
      setAddress(entry.address | '');
      setCity(entry.city | '');
      setState(entry.state | '');
      setPostalCode(entry.postalCode | '');
      setCountry(entry.country | '');
      setFavorite(entry.favorite || false);
    }
  }, [entry]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedEntry = {
      id: entry.id,
      userId,
      type,
      name,
      title,
      firstName,
      middleName,
      lastName,
      socialSecurityNumber,
      passportNumber,
      licenseNumber,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      country,
      favorite
    }

    UserService.modifyEntry(userId, entry.id, updatedEntry)
      .then(response => {
        onEditEntry(response.data);
        closeModal();
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas aktualizowania wpisu', error);
      });
  };

  return (
    <>
      <CDBModalHeader toggle={closeModal}>Nowy element</CDBModalHeader>
      <CDBModalBody style={{ width: "100%", padding: "15px" }}>
        <form onSubmit={handleSubmit}>
          <CDBContainer>
            <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
            <CDBInput
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              className='flex-nowrap mb-2'
              value={entry.name}
              onChange={(e) => setName(e.target.value)}
              maxLength = {40}
              type="text"
              required
            />
            <label style={{ fontSize: "15px", float: "left"}}>Tytuł</label>
              <CDBSelect
                style={{
                  fontSize: "15px",
                  width: "100%",
                  margin: "5px 0",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ddd"
                }}
                className='flex-nowrap mb-2'
                value={entry.title}
                onChange={(e) => setTitle(e.target.value)}
                selected="-Wybierz-"
              />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Imię</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Drugie imię</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Nazwisko</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Numer PESEL</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.socialSecurityNumber}
                  onChange={(e) => setSocialSecurityNumber(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Numer paszportu</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Numer prawa jazdy</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Adres e-mail</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Telefon</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength = {12}
                  type="text"
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Adres</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Miasto</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Województwo</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                />
              </div>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Kod pocztowy</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Państwo</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                />
              </div>
            </div>
          </CDBContainer>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <CDBBtn type="submit">Zapisz</CDBBtn>
            <CDBBtn type="button" color='light' onClick={closeModal}>Anuluj</CDBBtn>
          </div>
        </form>
      </CDBModalBody>
    </>
  );
}

export default ModifyIdentityModal;