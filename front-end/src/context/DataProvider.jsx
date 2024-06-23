/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import apiEndpoint from "../api";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataJobs, setDataJobs] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  useEffect(() => {
    getDataJobs();
    getDataUsers();
  }, []);
  const getDataJobs = () => {
    axios
      .get(apiEndpoint.all_jobs)
      .then((response) => setDataJobs(response.data))
      .catch((error) => console.log(error));
  };
  const getDataUsers = () => {
    axios
      .get(apiEndpoint.all_user)
      .then((response) => {
        setDataUsers(response.data);
      })
      .catch((error) => console.log(error));
  };
  const getUserInfo = (uid) => {
    const userInfo = dataUsers.find((user) => user?.uid === uid);
    return userInfo || null;
  };
  const dataInfo = {
    dataJobs,
    dataUsers,
    getUserInfo,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
