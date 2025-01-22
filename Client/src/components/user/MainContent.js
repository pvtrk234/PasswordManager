import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CDBTable, CDBTableHeader, CDBTableBody, CDBBtn, CDBModal, CDBIcon, CDBDropDown, CDBDropDownToggle, CDBDropDownMenu, CDBDropDownItem } from 'cdbreact';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import AddLoginDataModal from './modal/AddLoginDataModal';
import AddCreditCardModal from './modal/AddCreditCardModal';
import AddIdentityModal from './modal/AddIdentityModal';
import AddNoteModal from './modal/AddNoteModal';

import ModifyLoginDataModal from './modal/ModifyLoginDataModal';
import ModifyCreditCardModal from './modal/ModifyCreditCardModal';
import ModifyIdentityModal from "./modal/ModifyIdentityModal";
import ModifyNoteModal from "./modal/ModifyNoteModal";
import SelectEntryTypeModal from './modal/SelectEntryTypeModal';

const API_URL = "http://localhost:8080/api/user/";

const icons = {
  "loginData": "globe",
  "creditCard": "credit-card",
  "identity": "id-card",
  "note": "sticky-note",
}

function UserPanel() {
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('loginData');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || 'all';
    const userId = currentUser.id;

    UserService.getUserBoard().then(
      (response) => {
        //setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console.log(_content)
          setContent(_content)
      }
    )
    setModalType(type);
    
     //getAllEntries
     if (type !== 'all') {
      UserService.getAllEntries(userId, type).then(response => {
        setEntries(response.data);
      })
    } else {
      UserService.getAllEntries(userId).then(response => {
        setEntries(response.data);
      })
    }
  }, [location]);

  const openModal = (entry = null) => {
    setSelectedEntry(entry);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setIsOpen(false);
  };

  const handleNewEntry = (entry) => {
    
    const updatedEntries = selectedEntry
      ? entries.map((e) => (e.id === entry.id ? entry : e))
      : [...entries, entry];
    setEntries(updatedEntries);
    closeModal();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (entryId) => {
    UserService.deleteEntry(currentUser.id, entryId)
      .then(() => {
        setEntries(entries.filter(entry => entry.id !== entryId));
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas usuwania wpisu', error);
      });
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const renderModalContent = () => {
    if (selectedEntry) {
      if (selectedEntry.type === 'loginData') {
        return (
          <ModifyLoginDataModal
            onEditEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
            entry={selectedEntry}
          />
        );
      } else if (selectedEntry.type === 'creditCard') {
        return (
          <ModifyCreditCardModal
            onEditEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
            entry={selectedEntry}
          />
        );
      } else if (selectedEntry.type === 'identity') {
        return (
          <ModifyIdentityModal
            onEditEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
            entry={selectedEntry}
          />
        );
      } else if (selectedEntry.type === 'note') {
        return (
          <ModifyNoteModal
            onEditEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
            entry={selectedEntry}
          />
        );
      }
    } else {
      if (modalType === 'loginData' || modalType === 'favourite') {
        return (
          <AddLoginDataModal
            onNewEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
          />
        );
      } else if (modalType === 'all') {
        return (
          <SelectEntryTypeModal
          onNewEntry={handleNewEntry}
          closeModal={closeModal}
          userId={currentUser.id}
        />
        );
      } else if (modalType === 'creditCard') {
        return (
          <AddCreditCardModal
            onNewEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
          />
        );
      } else if (modalType === 'identity') {
        return (
          <AddIdentityModal
            onNewEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
          />
        );
      } else if (modalType === 'note') {
        return (
          <AddNoteModal
            onNewEntry={handleNewEntry}
            closeModal={closeModal}
            userId={currentUser.id}
          />
        );
      }
    }
  };

  return (
    <div className="user-panel" style={{ marginTop: "150px", width: '100%' }}>
      <div className="content">
        {content === "Network Error" ? (
          <p style={{ color: "white"}}>Brak połączenia.</p>
        ) : (
          entries.length === 0 ? (
            <>
              <p style={{ color: "white"}}>Brak elementów.</p>
              <CDBBtn icon="plus" style={{ marginLeft: "auto", marginRight: "auto"}} onClick={() => openModal()}> {/* Ustawienie domyślnego typu modal */}
                <CDBIcon icon="plus" className="me-1"/>
                Dodaj nowy element
              </CDBBtn>
            </>
          ) : (
            <>
              <CDBTable striped fixed hover maxHeight="100%" tHead="red">
                <CDBTableHeader>
                <tr>
                  <th style={{ verticalAlign: 'middle' }}></th>
                  <th style={{ verticalAlign: 'middle' }}>Nazwa</th>
                  <th style={{ verticalAlign: 'middle' }}>Typ</th>
                  <th style={{ verticalAlign: 'middle' }}><CDBIcon icon="ellipsis-v" /></th>
                </tr>
                </CDBTableHeader>
                <CDBTableBody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td style={{ verticalAlign: 'middle' }}><CDBIcon size="lg" icon={icons[entry.type]} /></td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <a href="#" onClick={() => openModal(entry)}>{entry.name}</a>
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>{entry.type}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      {entry.type === 'loginData' && (
                        <CDBDropDown>
                          <CDBDropDownToggle color="light" caret>
                            <CDBIcon icon="ellipsis-v" />
                          </CDBDropDownToggle>
                          <CDBDropDownMenu dropleft>
                            <CDBDropDownItem icon="globe" onClick={() => handleCopy(entry.username)}>
                              <CDBIcon icon="clone" className="me-1"/>
                              Kopiuj nazwę użytkownika
                            </CDBDropDownItem>
                            <CDBDropDownItem onClick={() => handleCopy(entry.password)}>
                              <CDBIcon icon="clone" className="me-1"/>
                              Kopiuj hasło
                            </CDBDropDownItem>
                            <CDBDropDownItem onClick={() => handleDelete(entry.id)}>
                              <CDBIcon icon="trash" className="me-1"/>
                              Usuń
                            </CDBDropDownItem>
                          </CDBDropDownMenu>
                        </CDBDropDown>
                      )} {
                        (entry.type === 'creditCard' || entry.type === 'identity' || entry.type === 'note') && (
                          <CDBDropDown>
                            <CDBDropDownToggle color="light" caret>
                              <CDBIcon icon="ellipsis-v" />
                            </CDBDropDownToggle>
                            <CDBDropDownMenu dropleft>
                              <CDBDropDownItem onClick={() => handleDelete(entry.id)}>
                                <CDBIcon icon="trash" className="me-1"/>
                                Usuń
                              </CDBDropDownItem>
                            </CDBDropDownMenu>
                          </CDBDropDown>
                        )
                      }
                    </td>
                  </tr>
                ))}
                </CDBTableBody>
              </CDBTable>
            </>
          )
        )}

        <CDBModal size='lg' isOpen={modalIsOpen} toggle={closeModal}>
          {renderModalContent()}
        </CDBModal>
      </div>
    </div>
  );
}

export default UserPanel;
