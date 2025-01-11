import React, { useState } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBSelect, CDBBtn, CDBInput } from 'cdbreact';

import UserService from '../../../services/user.service';
import '../../../styles/user/Modal.css'

function AddIdentityModal({ userId, onNewEntry, closeModal }) {
  const [type, setType] = useState('identity');
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

  const [titles] = useState([
    { text: "Pan", value: "pan"},
    { text: "Pani", value: "pani"},
    { text: "Mr", value: "mr"},
    { text: "Mrs", value: "mrs"},
  ])

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEntry = {
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
    };

    UserService.createEntry(userId, newEntry)
      .then(response => {
        onNewEntry(response.data);
        setType('');
        setName('');
        setTitle('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setSocialSecurityNumber('');
        setPassportNumber('');
        setLicenseNumber('');
        setEmail('');
        setPhone('');
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setCountry('');
        setFavorite(false);
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas tworzenia wpisu', error);
      });
  };

  return (
    <>
      <CDBModalHeader className="headerModal" toggle={closeModal}>Nowy element</CDBModalHeader>
      <CDBModalBody className="bodyModal">
        <form onSubmit={handleSubmit}>
          <CDBContainer>
            <label>Jakiego rodzaju jest to element?</label>
            <CDBSelect
              style={{
                width: "100%",
                padding: "5px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              disabled
              selected="Tożsamość"
            />
            <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
            <CDBInput
              className='flex-nowrap mb-2'
              value={name}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                options={titles}
                selected="-Wybierz-"
              />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "31%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Imię</label>
                <CDBInput 
                  className='flex-nowrap mb-2'
                  value={firstName}
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
                  value={middleName}
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
                  value={lastName}
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
                  value={socialSecurityNumber}
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
                  value={passportNumber}
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
                  value={licenseNumber}
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
                  value={email}
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
                  value={phone}
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
                  value={address}
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
                  value={city}
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
                  value={state}
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
                  value={postalCode}
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
                  value={country}
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

export default AddIdentityModal;