import React, { useState } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBSelect, CDBBtn, CDBInput, CDBInputGroup } from 'cdbreact';
import axios from 'axios';

function AddEntryModal({ userId, onNewEntry, closeModal }) {
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [favorite, setFavorite] = useState(false);

  const [optio11n] = useState([
    {
      text: 'Dane logowania',
      value: 'loginData',
    },
    {
      text: 'Tożsamość',
      value: 'identity',
    },
    {
      text: 'Szyfrowana notatka',
      value: 'note',
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEntry = {
      userId,
      type,
      content,
      favorite
    };

    axios.post('/api/entries', newEntry)
      .then(response => {
        onNewEntry(response.data);
        setType('');
        setContent('');
        setFavorite(false);
      })
      .catch(error => {
        console.error('There was an error creating the entry!', error);
      });
  };

  return (
    <>
      <CDBModalHeader toggle={closeModal}>Nowy element</CDBModalHeader>
      <CDBModalBody style={{ width: "100%", padding: "15px" }}>
        <form onSubmit={handleSubmit}>
          <CDBContainer>
            <label style={{ fontSize: "15px", float: "left" }}>Jakiego rodzaju jest to element?</label>
            <CDBSelect
              style={{
                width: "100%",
                padding: "5px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              disabled
              options={option}
              selected="Karta"
            />
            <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
            <CDBInput
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              maxLength = {40}
              type="text"
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Właściciel karty</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  maxLength = {40}
                  type="text"
                />
              </div>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Wydawca</label>
                <CDBSelect
                  style={{
                    fontSize: "15px",
                    width: "100%",
                    margin: "5px 0",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  options={option}
                  selected="-Wybierz-"
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Numer</label>
                <CDBInputGroup
                  type="password"
                  icon="bell"
                  containerClassName="flex-nowrap mb-3"
                  maxLength = {16}
                  onIconClick={() => console.log('123')}
                />
              </div>
              <div style={{ width: "48%", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <label style={{ fontSize: "15px", float: "left"}}>Miesiąc wyga</label>
                  <CDBSelect
                    style={{
                      fontSize: "15px",
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ddd"
                    }}
                    options={option}
                    selected="-Wybierz- "
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label style={{ fontSize: "15px", float: "left"}}>Rok wyga</label>
                  <CDBInput
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ddd"
                    }}
                    maxLength = {4}
                    type="text"
                    placeholder="np. 2026"
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Kod zabezpieczający (CVV)</label>
                <CDBInputGroup
                  type="password"
                  icon="bell"
                  maxLength = {4}
                  containerClassName="flex-nowrap mb-3"
                  onIconClick={() => console.log('123')}
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Notatki</label>
                <CDBInput
                  style={{
                    width: "100%",
                    padding: "5px",
                    height: "100px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  type="textarea"
                />
              </div>
          </CDBContainer>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <CDBBtn type="submit">Zapisz</CDBBtn>
            <CDBBtn type="button" color='light' onClick={closeModal}>Anuluj</CDBBtn>
          </div>
        </form>
      </CDBModalBody>
    </>
  );
}

export default AddEntryModal;
