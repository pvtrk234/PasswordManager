import React from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div style={{ paddingTop: "150px", color: "white"}}className="container">
      <header className="jumbotron">
        <h3>
          Profil użytkownika <strong>{currentUser.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>ID:</strong> {currentUser.id}
      </p>
      <p>
        <strong>E-mail:</strong> {currentUser.email}
      </p>
      <strong>Autoryzacja:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;