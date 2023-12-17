import React, { useContext, useEffect, useState } from "react";
import styles from "./resume.module.css";
import UrlTable from "./UrlTable";
import FolderChecker from "./FolderChecker";
import { UrlValue } from "../context/UrlContext";
const Resume = () => {
  const { formNum, setFormNum } = useContext(UrlValue);
  useEffect(() => {
    document.title = "Resume";
  }, []);

  function showCopmponent() {
    if (formNum == 1) {
      return <UrlTable />;
    } else {
      return <FolderChecker />;
    }
  }

  const url = ["Url ShortNer", "Folder Cheaker"];
  return (
    <>
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
