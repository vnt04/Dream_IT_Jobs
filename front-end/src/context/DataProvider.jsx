/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import apiEndpoint from "../api";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [dataJobs, setDataJobs] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataRecruiter, setDataRecruiter] = useState([]);
  const [dataCompany, setDataCompany] = useState([]);
  const [dataBlog, setDataBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getDataJobs(),
          getDataUsers(),
          getDataCompany(),
          getDataBlog(),
          getDataRecruiter(),
        ]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDataJobs = () => {
    axios
      .get(apiEndpoint.all_jobs)
      .then((response) => {
        setDataJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getDataUsers = () => {
    axios
      .get(apiEndpoint.all_user)
      .then((response) => {
        setDataUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getDataRecruiter = () => {
    axios
      .get(apiEndpoint.all_recruiter)
      .then((response) => {
        setDataRecruiter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getUserInfo = (uid) => {
    const userInfo = dataUsers.find((user) => user?.uid === uid);
    return userInfo || null;
  };

  const getDataCompany = () => {
    axios
      .get(apiEndpoint.all_company)
      .then((response) => {
        setDataCompany(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const mostFollow = [...dataCompany];
  mostFollow.sort((a, b) => a - b);

  const getDataBlog = () => {
    axios
      .get(apiEndpoint.all_blog)
      .then((response) => setDataBlog(response.data))
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const dataInfo = {
    dataJobs,
    dataUsers,
    getUserInfo,
    dataCompany,
    mostFollow,
    dataBlog,
    loading,
    dataRecruiter,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
