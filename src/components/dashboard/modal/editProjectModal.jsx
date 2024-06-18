import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import globalStore from "@/store/global";
import { localMetaData } from "@/utils/localMetaData";
import CurrencyInput from "react-currency-input-field";
import projectsStore from "@/store/myprofile/projects";
import Toastr from "@/components/toastr/toastr";

export default function EditProjectModal({ editRecord, onCloseModal }) {
  const { meta } = globalStore();
  const { updateProject } = projectsStore();

  const buttonRef = useRef(null);
  const [showToastr, setShowToastr] = useState(false);
  const [basicInfoObj, setBasicInfoObj] = useState({
    title: "",
    projectCategory: "",
    freelancerType: "",
    priceType: "",
    cost: "",
    description: "",
    projectDuration: "",
    level: "",
    projectSkills: [],
    description: "",
  });

  const resetBasicInfoObj = () => {
    const obj = {
      title: "",
      projectCategory: "",
      freelancerType: "",
      priceType: "",
      cost: "",
      description: "",
      projectDuration: "",
      projectSkills: [],
    };
    setBasicInfoObj(obj);
  };

  useEffect(() => {
    if (editRecord) {
      setBasicInfoObj(editRecord);
    }
  }, [editRecord]);

  const handleCurrencyInputChange = (e, name) => {
    const obj = {
      target: { name: name, value: e },
    };
    handleInputChange(obj);
  };

  const handleInputChange = (e, selectField) => {
    if (!e && selectField) {
      setBasicInfoObj({
        ...basicInfoObj,
        [selectField.name]: "",
      });
      return;
    }

    const name = selectField ? selectField.name : e.target.name;
    const value = selectField
      ? Array.isArray(e)
        ? filterSelectedSkills(e)
        : e.value
      : e.target.value;

    setBasicInfoObj({
      ...basicInfoObj,
      [name]: value,
    });
  };

  const filterSelectedSkills = (skills) => {
    return skills.map((item) => item.value);
  };

  const getSkillObject = () => {
    const result = meta.skills.filter((option) =>
      basicInfoObj.projectSkills.some((pSkill) => pSkill.name === option.value)
    );
    return result;
  };

  const onCloseProjectModal = () => {
    onCloseModal();
  };

  const onSubmitForm = async () => {
    const result = await updateProject(basicInfoObj, editRecord.id);
    if (result) {
      setShowToastr(result);
      resetBasicInfoObj();
      buttonRef.current.click();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="editProjectModal"
        tabIndex={-1}
        aria-labelledby="editProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content position-relative">
            <div className="modal-header sticky-header">
              <h5 className="modal-title">
                Edit Project
                <button
                  type="button"
                  className="btn-close position-absolute"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => onCloseProjectModal()}
                />
              </h5>
            </div>
            <div className="modal-body p-4">
              <form className="form-style1">
                <div className="row">
                  <div className="col">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Project Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={basicInfoObj.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Category
                      </label>
                      <Select
                        classNamePrefix="custom"
                        isClearable
                        name="projectCategory"
                        value={meta.services.find(
                          (option) =>
                            option.value === basicInfoObj.projectCategory
                        )}
                        options={meta.services}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Freelancer Type
                        </label>
                        <Select
                          classNamePrefix="custom"
                          isClearable
                          name="freelancerType"
                          value={localMetaData.freeLancerType.find(
                            (option) =>
                              option.value === basicInfoObj.freelancerType
                          )}
                          options={localMetaData.freeLancerType}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Price type
                        </label>
                        <Select
                          classNamePrefix="custom"
                          isClearable
                          name="priceType"
                          value={localMetaData.priceTypes.find(
                            (option) => option.value === basicInfoObj.priceType
                          )}
                          options={localMetaData.priceTypes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Cost
                        </label>
                        <CurrencyInput
                          className="form-control"
                          prefix="$"
                          name="cost"
                          placeholder="Please enter a number"
                          value={basicInfoObj.cost}
                          onValueChange={handleCurrencyInputChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Project Duration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="projectDuration"
                          value={basicInfoObj.projectDuration}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Level
                        </label>
                        <Select
                          classNamePrefix="custom"
                          isClearable
                          name="level"
                          value={localMetaData.projectDuration.find(
                            (option) => option.value === basicInfoObj.level
                          )}
                          options={localMetaData.levels}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Required Skills on Project
                        </label>
                        <Select
                          classNamePrefix="custom"
                          isClearable
                          isMulti
                          name="projectSkills"
                          value={getSkillObject()}
                          options={meta.skills}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb10">
                          Project Detail
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Description"
                          name="description"
                          value={basicInfoObj.description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer sticky-footer">
              <button
                type="button"
                className="ud-btn btn-thm close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={buttonRef}
                onClick={() => onCloseProjectModal()}
              >
                Cancel
                <i className="fal fa-arrow-right-long" />
              </button>
              <button
                type="button"
                className="ud-btn btn-thm"
                onClick={() => onSubmitForm()}
              >
                Update
                <i className="fal fa-arrow-right-long" />
              </button>
              <div className="text-start"></div>
            </div>
          </div>
        </div>
      </div>
      {showToastr && <Toastr showToastr={showToastr} />}
    </>
  );
}
