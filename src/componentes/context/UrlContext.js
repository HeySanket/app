import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
export const UrlValue = createContext();
const UrlContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [pageLength, setPageLength] = useState(0);
  const [pageNumber, setPageageNumber] = useState(1);
  const [editData, setEditData] = useState(false);
  const [UrlForm, setUrlForm] = useState(false);
  const [formNum, setFormNum] = useState(1);
  const [urlData, setUrlData] = useState({ originalUrl: "" });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SHORTURL_API_KEY}?pageNumber=${pageNumber}`)
      .then((result) => {
        setData(result.data.data);
        setPageLength(result.data.lastPage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber, urlData]);
  return (
    <UrlValue.Provider
      value={{
        data,
        setData,
        pageLength,
        setPageLength,
        pageNumber,
        setPageageNumber,
        editData,
        setEditData,
        UrlForm,
        setUrlForm,
        formNum,
        setFormNum,
        urlData,
        setUrlData,
      }}
    >
      {children}
    </UrlValue.Provider>
  );
};

export default UrlContext;
