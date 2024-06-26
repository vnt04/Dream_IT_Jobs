/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import apiEndpoint from "../api";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataJobs, setDataJobs] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataCompany, setDataCompany] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);

  useEffect(() => {
    getDataJobs();
    getDataUsers();
    getDataCompany();
    getDataBlog();
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

  const getDataCompany = () => {
    axios
      .get(apiEndpoint.all_company)
      .then((response) => setDataCompany(response.data))
      .catch((error) => console.log(error));
  };
  const mostFollow = [...dataCompany];
  mostFollow.sort((a, b) => a - b);

  const getDataBlog = () => {
    axios
      .get(apiEndpoint.all_blog)
      .then((response) => setDataBlog(response.data))
      .catch((error) => console.log(error));
  };

  const dataInfo = {
    dataJobs,
    dataUsers,
    getUserInfo,
    dataCompany,
    mostFollow,
    dataBlog,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
