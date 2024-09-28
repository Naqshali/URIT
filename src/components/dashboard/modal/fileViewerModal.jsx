import { useEffect } from "react";

export default function FileViewer({ file }) {
  useEffect(() => {
    console.log("file", file);
  }, [file]);

  return (
    <>
      <div
        className="modal fade"
        id="fileViewerModal"
        tabIndex={-1}
        aria-labelledby="fileViewerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-llg">
          <div className="modal-content position-relative">
            <button
              type="button"
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{
                top: "28px",
                right: "25px",
                zIndex: "9",
                fontSize: "16px",
              }}
            />
            <div className="modal-body fileViewer">
              {file && (
                <div style={{ height: "80vh", width: "100%" }}>
                  <iframe
                    src={file.fileUrl}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    title="PDF Viewer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
