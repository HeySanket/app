import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { UrlValue } from "../context/UrlContext";
import styles from "./resume.module.css";
const CreateShortUrl = () => {
  const { urlData, setUrlData, setUrlForm, editData, setEditData } =
    useContext(UrlValue);
  const eventChange = (e) => {
    const { name, value } = e.target;
    setUrlData({ ...urlData, [name]: value });
  };

  const formEvent = (e) => {
    e.preventDefault();
    console.log(editData, "editData");
    if (editData) {
      console.log("edit");
      axios
        .put(
          `${process.env.REACT_APP_SHORTURL_API_KEY}/${urlData._id}`,
          urlData
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      setEditData(false);
    } else {
      axios
        .post(`${process.env.REACT_APP_SHORTURL_API_KEY}`, urlData)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setUrlForm(false);
  };

  const changeName = () => {
    setUrlForm(false);
    setEditData(false);
  };
  return ReactDOM.createPortal(
    <>
      <div className="modal-warper" onClick={changeName}></div>
      <div className={`modal-containt ${styles.size}`}>
        <div>
          <form onSubmit={formEvent}>
            <h2 style={{ marginBottom: 10 }}>
              {editData ? "Edit" : "Create"} Short Url
            </h2>
            <input
              type="text"
              value={urlData.originalUrl}
              name="originalUrl"
              onChange={eventChange}
              className={`${styles.mb5}`}
            />
            <button type="submit" className="btn">
              {editData ? "Edit" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </>,

    document.getElementById("portel")
  );
};

export default CreateShortUrl;
