import React, { useState } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBSelect, CDBBtn, CDBInput, CDBInputGroup } from 'cdbreact';

import UserService from '../../../services/user.service';

function AddCreditCardModal({ userId, onNewEntry, closeModal }) {
  const [type, setType] = useState('creditCard');
  const [name, setName] = useState('');
  const [cardOwner, setCardOwner] = useState('');
  const [cardIssuer, setIssuer] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [note, setNote] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  const [issuer1] = useState([
    { text: 'Visa', value: 'visa' },
    { text: 'Mastercard', value: 'mastercard' },
    { text: 'Inne', value: 'other' },
  ]);

  const [months] = useState([
    { text: '01 - Styczeń', value: '01' },
    { text: '02 - Luty', value: '02' },
    { text: '03 - Marzec', value: '03' },
    { text: '04 - Kwiecień', value: '04' },
    { text: '05 - Maj', value: '05' },
    { text: '06 - Czerwiec', value: '06' },
    { text: '07 - Lipiec', value: '07' },
    { text: '08 - Sierpień', value: '08' },
    { text: '09 - Wrzesień', value: '09' },
    { text: '10 - Październik', value: '10' },
    { text: '11 - Listopad', value: '11' },
    { text: '12 - Grudzień', value: '12' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();


    const newEntry = {
      userId,
      type,
      name,
      cardOwner,
      cardIssuer,
      cardNumber,
      expiryMonth,
      expiryYear,
      securityCode,
      note,
      favorite
    };

    UserService.createEntry(userId, newEntry)
      .then(response => {
        onNewEntry(response.data);
        setType('');
        setName('');
        setCardOwner('');
        setIssuer('');
        setCardNumber('');
        setExpiryMonth('');
        setExpiryYear('');
        setSecurityCode('');
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
              selected="Karta kredytowa"
            />
            <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
            <CDBInput
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength = {40}
              type="text"
              required
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
                  value={cardOwner}
                  onChange={(e) => setCardOwner(e.target.value)}
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
                  value={cardIssuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  options={issuer1}
                  selected="-Wybierz-"
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
              <div style={{ width: "48%" }}>
                <label style={{ fontSize: "15px", float: "left"}}>Numer</label>
                <CDBInputGroup
                  type={showCardNumber ? "text" : "password"} 
                  icon={showCardNumber ? "eye" : "eye-slash" }
                  containerClassName="flex-nowrap mb-3"
                  value={cardNumber}
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength = {16}
                  onIconClick={() => console.log('123')}
                />
              </div>
              <div style={{ width: "48%", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <label style={{ fontSize: "15px", float: "left"}}>Miesiąc wygaśnięcia</label>
                  <CDBSelect
                    style={{
                      fontSize: "15px",
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ddd"
                    }}
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    options={months}
                    selected="-Wybierz- "
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label style={{ fontSize: "15px", float: "left"}}>Rok wygaśnięcia</label>
                  <CDBInput
                    style={{
                      width: "100%",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ddd"
                    }}
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
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
                  type={showCVV ? "text" : "password"} 
                  icon={showCVV ? "eye" : "eye-slash" }
                  value={securityCode}
                  onClick={() => setShowCVV(!showCVV)}
                  onChange={(e) => setSecurityCode(e.target.value)}
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

export default AddCreditCardModal;
