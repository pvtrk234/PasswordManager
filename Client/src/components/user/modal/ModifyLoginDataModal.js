import React, { useState, useEffect } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBBtn, CDBInput, CDBInputGroup, CDBIcon } from 'cdbreact';

import UserService from '../../../services/user.service';
import "../../../styles/user/Modal.css";

function ModifyLoginDataModal({ userId, entry, onEditEntry, closeModal }) {
  const [type] = useState('loginData');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uri, setURI] = useState('');
  const [note, setNote] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (entry) {
      setName(entry.name || '');
      setUsername(entry.username || '');
      setPassword(entry.password || '');
      setURI(entry.uri || '');;
      setNote(entry.note || '');
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
      username,
      password,
      uri,
      note,
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
      <CDBModalHeader toggle={closeModal}>Edytuj element</CDBModalHeader>
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
              value={entry.name}
              onChange={(e) => setName(e.target.value)}
              maxLength = {40}
              type="text"
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Nazwa użytkownika</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entry.username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength = {40}
                  type="text"
                  required
                />
              </div>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Hasło</label>
                <CDBInputGroup 
                  type={showPassword ? "text" : "password"} 
                   icon={showPassword ? "eye" : "eye-slash" }
                  containerClassName="mb-3 mt-0"
                  value={entry.password}
                  onClick={() => setShowPassword(!showPassword)}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength = {16}
                  required
                >
                </CDBInputGroup>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>URI</label>
                <CDBInput 
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  className='flex-nowrap mb-3'
                  value={entry.uri}
                  onChange={(e) => setURI(e.target.value)}
                  maxLength = {40}
                  type="text"
                  placeholder='np. https://google.com'
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
                  value={entry.note}
                  onChange={(e) => setNote(e.target.value)}
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

export default ModifyLoginDataModal;
