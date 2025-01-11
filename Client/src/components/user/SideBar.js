import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter, CDBBtn, CDBModal } from 'cdbreact';

import SelectEntryTypeModal from './modal/SelectEntryTypeModal';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const SideBar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const currentUser = AuthService.getCurrentUser();

  const isActive = (path) => currentPath === path;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleNewEntry = (entry) => {
    UserService.createEntry(currentUser.id, entry)
      .then(response => {
        console.log(response.data)
      }).catch(error => {
        console.error('Wystąpił błąd podczas tworzenia wpisu', error);
      });
    closeModal();
  };

  return (
    <CDBSidebar backgroundColor="#20242c" maxWidth="400px" style={{ marginTop: "100px" }}>
      <div className='sidebar123'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Wszystkie sejfy</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <Link to={"/user?all"}>
              <CDBSidebarMenuItem active={isActive("/user?all")} icon="book">Wszystkie elementy</CDBSidebarMenuItem>
            </Link>
            <Link to={"/user?type=favourite"}>
              <CDBSidebarMenuItem active={isActive("/user?type=favourite")} icon="star">Ulubione</CDBSidebarMenuItem>
            </Link>
            <Link to={"/user?type=loginData"}>
              <CDBSidebarMenuItem active={isActive("/user?type=loginData")} icon="globe">Dane logowania</CDBSidebarMenuItem>
            </Link>
            <Link to={"/user?type=creditCard"}>
              <CDBSidebarMenuItem active={isActive("/user?type=creditCard")} icon="credit-card" iconType="solid">Karta kredytowa</CDBSidebarMenuItem>
            </Link>
            <Link to={"/user?type=identity"}>
              <CDBSidebarMenuItem active={isActive("/user?type=identity")} icon="id-card">Tożsamość</CDBSidebarMenuItem>
            </Link>
            <Link to={"/user?type=note"}>
              <CDBSidebarMenuItem active={isActive("/user?type=note")} icon="sticky-note">Bezpieczna notatka</CDBSidebarMenuItem>
            </Link>
            <CDBBtn icon="plus" style={{ marginLeft: "45%" }} onClick={openModal}>
              +
            </CDBBtn>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{ padding: '190px 5px' }}
          >
          </div>
        </CDBSidebarFooter>
      </div>
      <CDBModal size='lg' isOpen={modalIsOpen} toggle={closeModal}>
        <SelectEntryTypeModal
          onNewEntry={handleNewEntry}
          closeModal={closeModal}
          userId={currentUser.id}
        />
      </CDBModal>
    </CDBSidebar>
  );
};

export default SideBar;
