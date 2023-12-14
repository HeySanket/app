import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
const CreateShortUrl = ({ setUrlForm }) => {
  const [data, setData] = useState({});

  const eventChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formEvent = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("https://appbe.up.railway.app/shortUrl", data)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal-warper" onClick={() => setUrlForm(false)}></div>
      <div className="modal-containt">
        <form onSubmit={formEvent}>
          <input type="text" name="originalUrl" onChange={eventChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>,

    document.getElementById("portel")
  );
};

export default CreateShortUrl;
