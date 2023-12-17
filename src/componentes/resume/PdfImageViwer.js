import React from "react";
import ReactDOM from "react-dom";
const PdfImageViwer = ({
  view,
  imgOrPdf,
  setShow,
  setView,
  pdfData,
  setPdfData,
}) => {
  const hideModel = () => {
    setShow(false);
    setView(null);
    setPdfData(null);
  };
  return ReactDOM.createPortal(
    <>
      <div className="modal-warper" onClick={hideModel}></div>
      <div className="modal-containt">
        {imgOrPdf
          ? view && <img height={500} width={800} src={view} />
          : pdfData && (
              <iframe
                id="pdfIframe"
                title="PDF Viewer"
                height={610}
                width={800}
                src={pdfData}
                seamless="seamless"
                allowtransparency="true"
                frameBorder="0"
              ></iframe>
            )}
      </div>
    </>,
    document.getElementById("portel")
  );
};

export default PdfImageViwer;
