import React, { useEffect, useState } from "react";
import styles from "./resume.module.css";
import UrlTable from "./UrlTable";
import CreateShortUrl from "./CreateShortUrl";
import FolderChecker from "./FolderChecker";
const Resume = () => {
  const [UrlForm, setUrlForm] = useState(false);
  const [formNum, setFormNum] = useState(1);
  useEffect(() => {
    document.title = "Resume";
  }, []);

  function showCopmponent(val) {
    console.log(val);
    if (formNum == 1) {
      return <UrlTable UrlForm={UrlForm} setUrlForm={setUrlForm} />;
    } else {
      return <FolderChecker />;
    }
  }

  const url = ["Url ShortNer", "Folder Cheaker"];
  return (
    <>
      {UrlForm && <CreateShortUrl setUrlForm={setUrlForm} />}
      <div style={{ display: "flex", marginTop: 51 }}>
        <div className={`${styles.cr} ${styles.width}`}>
          {Array.isArray(url) &&
            url.map((val, i) => {
              return (
                <p
                  key={i}
                  onClick={() => {
                    setFormNum(i + 1);
                  }}
                >
                  {val}
                </p>
              );
            })}
        </div>
        <div className={`${styles.pl10} ${styles.width73}`}>
          {showCopmponent()}
        </div>
      </div>
    </>
  );
};

export default Resume;
