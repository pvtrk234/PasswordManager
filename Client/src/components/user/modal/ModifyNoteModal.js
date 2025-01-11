import React, { useState, useEffect } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBBtn, CDBInput } from 'cdbreact';

import UserService from '../../../services/user.service';

function ModifyNoteModal({ userId, entry, onEditEntry, closeModal }) {
  const [type] = useState('note');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (entry) {
      setName(entry.name || '');
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
              className='flex-nowrap mb-3'
              value={entry.name}
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

export default ModifyNoteModal;