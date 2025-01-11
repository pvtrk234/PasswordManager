import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import useAuth from "../../hooks/useAuth";
import MainContent from "./MainContent";
import SideBar from "./SideBar";
import "../../styles/user/Test.css";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useAuth();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(_content)
        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <>
    <div className="asd"> 
      <SideBar />
      <MainContent />
    </div>
    </>
  );
};

export default BoardUser;
