import React, { useState, useEffect } from "react";
import axios from "axios";
const FolderChecker = () => {
  const [data, setData] = useState({
    firstFolder: "",
    secondFolder: "",
  });
  const [mainFolder, setMainFolder] = useState([]);
  const [firstFolderArr, setFirstFolderArr] = useState([]);
  const [secondFolder, setSecondFolder] = useState([]);

  function callApi() {
    axios
      .get("https://appbe.up.railway.app/folderCheck")
      .then((result) => {
        setMainFolder(result.data.data);
        console.log(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    callApi();
  }, []);

  const eventChange = (e, val) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    if (val == 1) {
      console.log(data);
      axios
        .get(`https://appbe.up.railway.app/folderCheck/${e.target.value}`)
        .then((result) => {
          setFirstFolderArr(result.data.data);
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(data);
      axios
        .get(
          `https://appbe.up.railway.app/folderCheck/${data.firstFolder}/${e.target.value}`
        )
        .then((result) => {
          setSecondFolder(result.data);
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <select
        name="firstFolder"
        id="firstFolder"
        value={data.firstFolder}
        onChange={(e) => {
          eventChange(e, 1);
        }}
      >
        <option>Select</option>
        {Array.isArray(mainFolder) &&
          mainFolder.map((val, i) => {
            return <option key={val}>{val}</option>;
          })}
      </select>

      <select
        name="secondFolder"
        id="secondFolder"
        value={data.secondFolder}
        onChange={(e) => eventChange(e, 2)}
      >
        <option>Select</option>
        {Array.isArray(firstFolderArr) &&
          firstFolderArr.map((val, i) => {
            return <option key={val}>{val}</option>;
          })}
      </select>
      <div>
        {Array.isArray(secondFolder) &&
          secondFolder.map((val, i) => {
            return <p key={i}>{val}</p>;
          })}
      </div>
    </>
  );
};

export default FolderChecker;
