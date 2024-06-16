import BasicInformation2 from "../section/BasicInformation2";

export default function EditProjectModal() {
  return (
    <>
      <div
        className="modal fade"
        id="editEducationModal"
        tabIndex={-1}
        aria-labelledby="editEducationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <button
              type="button"
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ top: "10px", right: "10px", zIndex: "9" }}
            />
            <div className="modal-body p-4">
              <form>
                <BasicInformation2 />
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Update
                  <i className="fal fa-arrow-right-long" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
