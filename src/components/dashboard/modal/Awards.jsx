import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";
import moment from "moment";

export default function AwardsModal({ editRecord, awardsAdded }) {
  const { saveAwards, updateAwards } = profileStore();
  const [showToastr, setShowToastr] = useState(false);
  const [awardsObj, setAwardsObj] = useState({
    title: "",
    issuedBy: "",
    description: "",
    issueDate: "",
  });

  useEffect(() => {
    if (editRecord) {
      setAwardsObj(editRecord);
    }
  }, [editRecord]);

  const resetForm = () => {
    const obj = {
      title: "",
      issuedBy: "",
      description: "",
      issueDate: "",
    };
    setAwardsObj(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAwardsObj({
      ...awardsObj,
      [name]: value,
    });
  };

  const handleInputChangeDate = (date, name) => {
    setAwardsObj({
      ...awardsObj,
      [name]: date,
    });
  };

  const onCloseModal = () => {
    resetForm();
    awardsAdded();
  };

  const onSubmitForm = async () => {
    let result = null;

    if (awardsObj.issueDate != "") {
      awardsObj.issueDate = moment(awardsObj.issueDate).format("YYYY-MM-DD");
    }
    if (editRecord) {
      result = await updateAwards(awardsObj);
    } else {
      result = await saveAwards(awardsObj);
    }
    if (result) {
      resetForm();
      awardsAdded(true);
      setShowToastr(result);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="awardsModal"
        tabIndex={-1}
        aria-labelledby="awardsModalLabel"
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
              onClick={() => onCloseModal()}
            />
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        className="form-control"
                        name="title"
                        value={awardsObj.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Issued By</label>
                      <input
                        className="form-control"
                        name="issuedBy"
                        value={awardsObj.issuedBy}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="heading-color ff-heading fw500 mb10">
                      Issue Date
                    </label>
                    <div>
                      <DatePicker
                        className="form-control"
                        selected={awardsObj.issueDate}
                        dateFormat="MM-dd-yyyy"
                        placeholderText="MM-DD-YYYY"
                        onChange={(date) =>
                          handleInputChangeDate(date, "issueDate")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="heading-color ff-heading fw500 mb10">
                    Description
                  </label>
                  <textarea
                    cols={30}
                    rows={2}
                    name="description"
                    value={awardsObj.description}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  className="ud-btn btn-thm"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => onSubmitForm()}
                >
                  {editRecord ? "Update" : "Add"}
                  <i className="fal fa-arrow-right-long" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showToastr && <Toastr showToastr={showToastr} />}
    </>
  );
}
