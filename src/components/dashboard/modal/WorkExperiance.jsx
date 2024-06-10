import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";

export default function workExperianceModal({
  editRecord,
  workExperianceAdded,
}) {
  const { saveWorkExperiance } = profileStore();
  const [showToastr, setShowToastr] = useState(false);
  const [workExperianceObj, setWorkExperianceObj] = useState({
    designation: "",
    company: "",
    description: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    if (editRecord) {
      setWorkExperianceObj(editRecord);
    }
  }, [editRecord]);

  const resetForm = () => {
    const obj = {
      designation: "",
      company: "",
      description: "",
      startYear: "",
      endYear: "",
    };
    setWorkExperianceObj(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkExperianceObj({
      ...workExperianceObj,
      [name]: value,
    });
  };

  const handleInputChangeDate = (date, name) => {
    setWorkExperianceObj({
      ...workExperianceObj,
      [name]: date,
    });
  };

  const onCloseModal = () => {
    resetForm();
    awardsAdded();
  };

  const onSubmitForm = async () => {
    let result = null;
    if (editRecord) {
      result = await updateWorkExperiance(workExperianceObj);
    } else {
      result = await saveWorkExperiance(workExperianceObj);
    }
    if (result) {
      resetForm();
      workExperianceAdded(true);
      setShowToastr(result);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="workExperianceModal"
        tabIndex={-1}
        aria-labelledby="workExperianceModalLabel"
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
                      <label className="form-label">Designation</label>
                      <input
                        className="form-control"
                        name="designation"
                        value={workExperianceObj.designation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Company</label>
                      <input
                        className="form-control"
                        name="company"
                        value={workExperianceObj.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="heading-color ff-heading fw500 mb10">
                      Start Year
                    </label>
                    <div>
                      <DatePicker
                        className="form-control"
                        selected={workExperianceObj.startYear}
                        dateFormat="MM-dd-yyyy"
                        placeholderText="MM-DD-YYYY"
                        onChange={(date) =>
                          handleInputChangeDate(date, "startYear")
                        }
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="heading-color ff-heading fw500 mb10">
                      End Year
                    </label>
                    <div>
                      <DatePicker
                        className="form-control"
                        selected={workExperianceObj.endYear}
                        dateFormat="MM-dd-yyyy"
                        placeholderText="MM-DD-YYYY"
                        onChange={(date) =>
                          handleInputChangeDate(date, "endYear")
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
                    value={workExperianceObj.description}
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
