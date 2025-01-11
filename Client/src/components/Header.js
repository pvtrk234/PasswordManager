import React, { useState, useEffect } from "react";

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import '../styles/Header.css';

const Header = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });
      
        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <header id="header">

            <nav data-aos="zoom-out" data-aos-delay="800" className="navbar navbar-expand">
                <div className="container header">
                    <a className="navbar-brand" href="/">
                        <strong>🛡️ PassGuard</strong>
                    </a>
                    <div className="ml-auto"></div>
                    {!currentUser && (<>
                        <ul className="navbar-nav items">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Strona Główna</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">O nas</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/creators">Twórcy</a>
                            </li>
                            <li className="nav-item">
                            </li>
                        </ul>
                        <ul className="navbar-nav toggle">
                            <li className="nav-item">
                                <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                    <i className="fas fa-bars toggle-icon m-0"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <a href="/login" className="btn ml-lg-auto btn-bordered-white"><i class="fas fa-sign-in-alt"></i> Zaloguj się</a>
                            </li>
                        </ul>
                    </>)}
                
                    {currentUser && (<>
                        <ul className="navbar-nav items">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Strona Główna</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/user">Panel użytkownika</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">👤 {currentUser.username} </a>
                            </li>
                            <li className="nav-item">
                            </li>
                        </ul>

                        <ul className="navbar-nav toggle">
                            <li className="nav-item">
                                <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                    <i className="fas fa-bars toggle-icon m-0"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav action">
                            <li className="nav-item ml-3">
                                <a href="/" className="btn ml-lg-auto btn-bordered-white" onClick={logOut}><i class="fas fa-sign-out-alt"></i> Wyloguj się</a>
                            </li>
                        </ul>
                    </>)}
                </div>
            </nav>
        </header>
    );
}

export default Header;