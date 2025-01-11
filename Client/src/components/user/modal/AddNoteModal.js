import React, { useState } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBSelect, CDBBtn, CDBInput } from 'cdbreact';

import UserService from '../../../services/user.service';

function AddNoteModal({ userId, onNewEntry, closeModal }) {
  const [type, setType] = useState('note');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEntry = {
      userId,
      type,
      name,
      note,
      favorite
    };

    UserService.createEntry(userId, newEntry)
      .then(response => {
        onNewEntry(response.data);
        setType('');
        setName('');
        setNote('');
        setFavorite(false);
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas tworzenia wpisu', error);
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
              selected="Bezpieczna notatka"
            />
            <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
            <CDBInput
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              className='flex-nowrap mb-3'
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength = {40}
              type="text"
              required
            />
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
                  value={note}
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

export default AddNoteModal;