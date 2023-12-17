import React, { useState, useEffect } from "react";
import axios from "axios";
import PdfImageViwer from "./PdfImageViwer";
const FolderChecker = () => {
  const [data, setData] = useState({
    firstFolder: "",
    secondFolder: "",
    thirdFolder: "",
  });
  const [mainFolder, setMainFolder] = useState([]);
  const [firstFolderArr, setFirstFolderArr] = useState([]);
  const [secondFolder, setSecondFolder] = useState([]);
  const [thirdFolder, setThirdFolder] = useState([]);
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [imgOrPdf, setImgOrPdf] = useState(false);

  function callApi() {
    axios
      .get(`${process.env.REACT_APP_FOLDERCHECK_API_KEY}`)
      .then((result) => {
        setMainFolder(result.data.data);
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
      axios
        .get(`${process.env.REACT_APP_FOLDERCHECK_API_KEY}/${e.target.value}`)
        .then((result) => {
          setFirstFolderArr(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (val == 2) {
      axios
        .get(
          `${process.env.REACT_APP_FOLDERCHECK_API_KEY}/${data.firstFolder}/${e.target.value}`
        )
        .then((result) => {
          setSecondFolder(result.data.data);
          if (result.data.isDirectory) {
            setThirdFolder(result.data.data);
            setShowThirdInput(result.data.isDirectory);
          } else {
            setShowThirdInput(result.data.isDirectory);
            setSecondFolder(result.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(val);
    }
  };

  const imageView = (val) => {
    setShow(!show);

    const getFileExtension = (filename) => {
      return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
    };
    console.log(getFileExtension(val));

    if (getFileExtension(val) == "jpg" || "avif") {
      axios
        .get(`${process.env.REACT_APP_FOLDERCHECK_API_KEY}?name=${val}`, {
          responseType: "arraybuffer",
        })
        .then((data) => {
          console.log(data);
          const blob = new Blob([data.data], { type: "image/jpg" });
          const imageUrl = URL.createObjectURL(blob);
          setView(imageUrl);
          setImgOrPdf(true);
        })
        .catch((error) => console.error("Error fetching binary data:", error));
    }

    if (getFileExtension(val) == "pdf") {
      axios
        .get(`${process.env.REACT_APP_FOLDERCHECK_API_KEY}?name=${val}`, {
          responseType: "arraybuffer",
        })
        .then((data) => {
          const pdfBlob = new Blob([data.data], { type: "application/pdf" });
          const pdfDataUrl = URL.createObjectURL(pdfBlob);
          setPdfData(pdfDataUrl);
          setImgOrPdf(false);
        })
        .catch((error) => console.error("Error fetching PDF data:", error));
    }
  };

  return (
    <>
      {show && (
        <PdfImageViwer
          setView={setView}
          view={view}
          setShow={setShow}
          pdfData={pdfData}
          imgOrPdf={imgOrPdf}
          setPdfData={setPdfData}
        />
      )}
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
        style={{ marginTop: 10 }}
      >
        <option>Select</option>
        {Array.isArray(firstFolderArr) &&
          firstFolderArr.map((val, i) => {
            return <option key={val}>{val}</option>;
          })}
      </select>
      {showThirdInput && (
        <select
          name="thirdFolder"
          id="thirdFolder"
          value={data.thirdFolder}
          onChange={(e) => eventChange(e, 3)}
          style={{ marginTop: 10 }}
        >
          <option>Select</option>
          {Array.isArray(thirdFolder) &&
            thirdFolder.map((val, i) => {
              return <option key={val}>{val}</option>;
            })}
        </select>
      )}
      <div>
        {Array.isArray(secondFolder) &&
          secondFolder.map((val, i) => {
            return (
              <p key={i} onClick={() => imageView(val)}>
                {val}
              </p>
            );
          })}
      </div>
    </>
  );
};

export default FolderChecker;
