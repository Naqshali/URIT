import { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import profileStore from "@/store/myprofile/profile";

export default function EducationModal({ educationAdded, mode }) {
  const { education, getEducation, saveEducation } = profileStore();
  const [educationObj, setEducationObj] = useState({
    degree: "",
    institution: "",
    description: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      await getEducation();
    };
    fetchEducation();
  }, []);

  useEffect(() => {
    if (education) {
      console.log("education", education);
      setEducationObj(education);
    }
  }, [education]);

  const handleInputChange = (e, selectField) => {
    const field = selectField || e.target;
    const { name, value } = field;

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

  const onSubmitForm = async () => {
    educationAdded();
    await saveEducation(educationObj);
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
            />
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <SelectInput
                        label="Degree"
                        defaultValue={educationObj.degree}
                        name="degree"
                        data={[
                          {
                            option: "BSCS",
                            value: "bscs",
                          },
                          {
                            option: "MBA",
                            value: "mba",
                          },
                        ]}
                        handler={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <SelectInput
                        label="Institution"
                        defaultValue={educationObj.institution}
                        name="institution"
                        data={[
                          {
                            option: "UCP",
                            value: "ucp",
                          },
                          {
                            option: "UMT",
                            value: "umt",
                          },
                        ]}
                        handler={handleInputChange}
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
                  Add
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
