import axios from "axios";

import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/test/";
const API_URL1 = "http://localhost:8080/api/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAllEntries = (userId, type = false) => {
  if (type ) {
    return axios.get(API_URL1 + `entries?userId=${userId}&type=${type}`, { headers: authHeader() });
  } else {
    return axios.get(API_URL1 + `entries?userId=${userId}`, { headers: authHeader() });
  }
}

const deleteEntry = (userId, entryId) => {
  return axios.delete(`${API_URL1}entries?userId=${userId}&itemId=${entryId}`, { headers: authHeader() })
}

const createEntry = (userId, newEntry) => {
  return axios.post(`${API_URL1}entries?userId=${userId}`, newEntry, { headers: authHeader() })
}

const modifyEntry = (userId, entryId, updatedEntry) => {
  return axios.put(`${API_URL1}entries?userId=${userId}&itemId=${entryId}`, updatedEntry, { headers: authHeader() })
}


const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllEntries,
  deleteEntry,
  createEntry,
  modifyEntry
};

export default UserService;