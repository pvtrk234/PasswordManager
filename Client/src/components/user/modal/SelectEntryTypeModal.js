import React, { useState } from 'react';
import { CDBModalHeader, CDBModalBody, CDBContainer, CDBSelect, CDBBtn, CDBInput, CDBInputGroup, CDBIcon } from 'cdbreact';
import "../../../styles/user/Modal.css";

function SelectEntryTypeModal({ userId, onNewEntry, closeModal }) {
  const [type1, setType] = useState('loginData');
  const [entryData, setEntryData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  const types = {
    "Dane logowania" : "loginData",
    "Karta kredytowa" : "creditCard",
    "Tożsamość": "identity",
    "Bezpieczna notatka" : "note"
  }

  const entryTypes = [
    { text: 'Dane logowania', value: 'loginData', },
    { text: 'Karta kredytowa', value: 'creditCard' },
    { text: 'Tożsamość', value: 'identity' },
    { text: 'Bezpieczna notatka', value: 'note' },
  ];

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

  const [titles] = useState([
    { text: "Pan", value: "pan"},
    { text: "Pani", value: "pani"},
    { text: "Mr", value: "mr"},
    { text: "Mrs", value: "mrs"},
  ])

  const handleSubmit = (event) => {
    event.preventDefault();
    const type = types[type1];
    const newEntry = { userId, type, ...entryData };
    onNewEntry(newEntry);
  };

  const handleChange = (field) => (e) => {
    setEntryData({ ...entryData, [field]: e.target.value });
  };

  return (
    <>
      <CDBModalHeader className="headerModal" toggle={closeModal}> Nowy element</CDBModalHeader>
      <CDBModalBody className="bodyModal" style={{ width: "100%", padding: "15px" }}>
        <form onSubmit={handleSubmit}>
          <CDBContainer>
            <label style={{ fontSize: "15px", float: "left" }}>Typ elementu</label>
            <CDBSelect
              style={{
                width: "100%",
                padding: "5px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
              options={entryTypes}
              value={type1}
              onChange={(e) => setType(e.target.value)}
            />
            {types[type1] === 'loginData' && (
              <>
                <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
                <CDBInput
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  value={entryData.name || ''}
                  onChange={handleChange('name')}
                  maxLength={40}
                  type="text"
                    
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Nazwa użytkownika</label>
                    <CDBInput
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.username || ''}
                      onChange={handleChange('username')}
                      maxLength={40}
                      type="text"
                      required
                    />
                  </div>    
                  <div style={{ width: "48%", color: "black" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Hasło</label>
                    <CDBIcon icon="circle" className="password-con" onClick={() => console.log('123')}/>
                    <CDBInputGroup
                      type={showPassword ? "text" : "password"} 
                      icon={showPassword ? "eye" : "eye-slash" }
                      containerClassName="flex-nowrap mb-3"
                      value={entryData.password || ''}
                      onChange={handleChange('password')}
                      onClick={() => setShowPassword(!showPassword)}
                      maxLength={40}
                      required
                    />
                  </div>  
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>URI</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      className='flex-nowrap mb-3'
                      value={entryData.uri || ''}
                      onChange={handleChange('uri')}
                      maxLength = {40}
                      type="text"
                      placeholder='np. https://google.com'
                    />
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <label style={{ fontSize: "15px", float: "left" }}>Notatki</label>
                  <CDBInput
                    style={{
                      width: "100%",
                      padding: "5px",
                      height: "100px",
                      borderRadius: "5px",
                      border: "1px solid #ddd"
                    }}
                    value={entryData.note || ''}
                    onChange={handleChange('note')}
                    type="textarea"
                  />
                </div>
              </>
            )}
            {types[type1] === 'creditCard' && (
              <>
                <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
                <CDBInput
                  containerClassName="flex-nowrap mb-3"
                  value={entryData.name || ''}
                  onChange={handleChange('name')}
                  maxLength={40}
                  type="text"
                  required
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Właściciel karty</label>
                    <CDBInput
                      containerClassName="flex-nowrap mb-3"
                      value={entryData.cardOwner || ''}
                      onChange={handleChange('cardOwner')}
                      maxLength={40}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Wydawca</label>
                    <CDBSelect
                      style={{
                        fontSize: "15px",
                        width: "100%",
                        margin: "5px 0",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.issuer || ''}
                      onChange={handleChange('issuer')}
                      options={issuer1}
                      selected="-Wybierz-"
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div style={{ width: "48%", color: "black" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Numer</label>
                    <CDBInputGroup
                      type={showCardNumber ? "text" : "password"} 
                      icon={showCardNumber ? "eye" : "eye-slash" }
                      containerClassName="flex-nowrap mb-3"
                      value={entryData.cardNumber || ''}
                      onChange={handleChange('cardNumber')}
                      onClick={() => setShowCardNumber(!showCardNumber)}
                      maxLength = {16}
                    />
                  </div>
                  <div style={{ width: "48%", display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Miesiąc wygaśnięcia</label>
                    <CDBSelect
                      style={{
                        fontSize: "15px",
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.expiryMonth || ''}
                      onChange={handleChange('expiryMonth')}
                      options={months}
                      selected="-Wybierz- "
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Rok wygaśnięcia</label>
                    <CDBInput
                      containerClassName="flex-nowrap mb-3"
                      value={entryData.expiryYear || ''}
                      onChange={handleChange('expiryYear')}
                      maxLength={4}
                      type="text"
                      placeholder="np. 2026"
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%", color: "black"}}>
                  <label style={{ fontSize: "15px", float: "left" }}>Kod zabezpieczający (CVV)</label>
                  <CDBInputGroup
                    type={showCVV ? "text" : "password"} 
                    icon={showCVV ? "eye" : "eye-slash" }
                    containerClassName="flex-nowrap mb-3"
                    value={entryData.securityCode || ''}
                    onChange={handleChange('securityCode')}
                    onClick={() => setShowCVV(!showCVV)}
                    maxLength = {4}
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <label style={{ fontSize: "15px", float: "left" }}>Notatki</label>
                <CDBInput
                  containerClassName="flex-nowrap mb-3"
                  style={{ height: "100px" }}
                  value={entryData.note || ''}
                  onChange={handleChange('note')}
                  type="textarea"
                />
              </div>
              </>
            )}
            {types[type1] === 'identity' && (
              <>
                <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
                <CDBInput
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  className='flex-nowrap mb-2'
                  value={entryData.name || ''}
                  onChange={handleChange('name')}
                  maxLength = {40}
                  type="text"
                  required
                />
                <label style={{ fontSize: "15px", float: "left" }}>Tytuł</label>
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
                    value={entryData.title || ''}
                    onChange={handleChange('title')}
                    options={titles}
                    selected="-Wybierz-"
                  />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "31%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Imię</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.firstName || ''}
                      onChange={handleChange('firstName')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "31%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Drugie imię</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.middleName || ''}
                      onChange={handleChange('middleName')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "31%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Nazwisko</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.lastName || ''}
                      onChange={handleChange('lastName')}
                      type="text"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  <div style={{ width: "31%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Numer PESEL</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.socialSecurityNumber || ''}
                      onChange={handleChange('socialSecurityNumber')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "31%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Numer paszportu</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.passportNumber || ''}
                      onChange={handleChange('passportNumber')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "31%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Numer prawa jazdy</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.licenseNumber || ''}
                      onChange={handleChange('licenseNumber')}
                      type="text"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Adres e-mail</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.email || ''}
                      onChange={handleChange('email')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Telefon</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.phone || ''}
                      onChange={handleChange('phone')}
                      maxLength = {12}
                      type="text"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Adres</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.address || ''}
                      onChange={handleChange('address')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Miasto</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.city || ''}
                      onChange={handleChange('city')}
                      type="text"
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Województwo</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.state || ''}
                      onChange={handleChange('state')}
                      type="text"
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Kod pocztowy</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.postalCode || ''}
                      onChange={handleChange('postalCode')}
                      type="text"
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  <div style={{ width: "48%" }}>
                    <label style={{ fontSize: "15px", float: "left" }}>Państwo</label>
                    <CDBInput 
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ddd"
                      }}
                      value={entryData.country || ''}
                      onChange={handleChange('country')}
                      type="text"
                    />
                  </div>
                </div>
              </>
            )}
            {types[type1] === 'note' && (
              <>
                <label style={{ fontSize: "15px", float: "left" }}>Nazwa</label>
                <CDBInput
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                  }}
                  className='flex-nowrap mb-3'
                  value={entryData.name || ''}
                  onChange={handleChange('name')}
                  maxLength = {40}
                  type="text"
                  required
                />
                <div style={{ width: "100%" }}>
                  <label style={{ fontSize: "15px", float: "left" }}>Notatki</label>
                  <CDBInput
                    style={{
                      width: "100%",
                      padding: "5px",
                      height: "100px",
                      borderRadius: "5px",
                      border: "1px solid #ddd"
                    }}
                    value={entryData.note || ''}
                    onChange={handleChange('note')}
                    type="textarea"
                  />
                </div>
              </>
            )}
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

export default SelectEntryTypeModal;
