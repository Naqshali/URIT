import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";
import Select from "react-select";

export default function EducationModal({ editRecord, educationAdded, meta }) {
  const { saveEducation, updateEducation } = profileStore();
  const [showToastr, setShowToastr] = useState(false);
  const [educationObj, setEducationObj] = useState({
    degree: "",
    institution: "",
    description: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    if (editRecord) {
      setEducationObj(editRecord);
    }
  }, [editRecord]);

  const resetForm = () => {
    const obj = {
      degree: "",
      institution: "",
      description: "",
      startYear: "",
      endYear: "",
    };
    setEducationObj(obj);
  };

  const handleInputChange = (e, selectField) => {
    if (!e && selectField) {
      setProfileObj({
        ...profileObj,
        [selectField.name]: "",
      });
      return;
    }

    const name = selectField ? selectField.name : e.target.name;
    const value = selectField ? e.value : e.target.value;

    setEducationObj({
      ...educationObj,
      [name]: value,
    });
  };

  const handleInputChangeDate = (date, name) => {
    setEducationObj({
      ...educationObj,
      [name]: date,
    });
  };

  const onCloseModal = () => {
    resetForm();
    educationAdded();
  };

  const onSubmitForm = async () => {
    let result = null;
    if (editRecord) {
      result = await updateEducation(educationObj);
    } else {
      result = await saveEducation(educationObj);
    }
    if (result) {
      resetForm();
      educationAdded(true);
      setShowToastr(result);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="educationModal"
        tabIndex={-1}
        aria-labelledby="educationModalLabel"
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
                      <label className="heading-color ff-heading fw500 mb10">
                        Degree
                      </label>
                      <Select
                        classNamePrefix="custom"
                        isClearable={true}
                        name="degree"
                        value={meta.degrees.find(
                          (option) => option.value === educationObj.degree
                        )}
                        options={meta.degrees}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="heading-color ff-heading fw500 mb10">
                        Institution
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="institution"
                        value={educationObj.institution}
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
                        selected={educationObj.startYear}
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
                        selected={educationObj.endYear}
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
                    value={educationObj.description}
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
