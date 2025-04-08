"use client";
import { useState } from "react";
import SelectInput from "../option/SelectInput";
import globalStore from "@/store/global";
import projectsStore from "@/store/myprofile/projects";
import Select from "react-select";
import Toastr from "@/components/toastr/toastr";
import { localMetaData } from "@/utils/localMetaData";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";
import UploadAttachment from "./UploadAttachment";
import { InfinitySpin } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

export default function BasicInformation2() {
  const router = useRouter();
  const { meta } = globalStore();
  const { saveProject, uploadAttachments } = projectsStore();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [showToastr, setShowToastr] = useState(false);
  const [attachments, setAttachments] = useState([]);
  
  const [basicInfoObj, setBasicInfoObj] = useState({
    title: "",
    projectCategory: "",
    freelancerType: "",
    priceType: "",
    cost: "",
    description: "",
    expectedCompletionDate: "",
    level: "",
    language: "",
    languageLevel: "",
    projectSkills: [],
    description: "",
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!basicInfoObj.title) newErrors.title = "Project title is required";
    if (!basicInfoObj.projectCategory) newErrors.projectCategory = "Category is required";
    if (!basicInfoObj.freelancerType) newErrors.freelancerType = "Freelancer type is required";
    if (!basicInfoObj.priceType) newErrors.priceType = "Price type is required";
    if (!basicInfoObj.cost) newErrors.cost = "Cost is required";
    if (!basicInfoObj.expectedCompletionDate) newErrors.expectedCompletionDate = "Expected completion date is required";
    if (!basicInfoObj.level) newErrors.level = "Level is required";
    if (!basicInfoObj.language) newErrors.language = "Language is required";
    if (!basicInfoObj.languageLevel) newErrors.languageLevel = "Language level is required";
    if (!basicInfoObj.projectSkills || basicInfoObj.projectSkills.length === 0) newErrors.projectSkills = "At least one skill is required";
    if (!basicInfoObj.description) newErrors.description = "Project description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetBasicInfoObj = () => {
    const obj = {
      title: "",
      projectCategory: "",
      freelancerType: "",
      priceType: "",
      cost: "",
      description: "",
      expectedCompletionDate: "",
      level: "",
      language: "",
      languageLevel: "",
      projectSkills: [],
      description: "",
    };
    setBasicInfoObj(obj);
  };

  const handleCurrencyInputChange = (e, name) => {
    const obj = {
      target: { name: name, value: e },
    };
    handleInputChange(obj);
  };

  const handleInputChange = (e, selectField) => {
    const name = selectField ? selectField.name : e.target.name;
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    if (!e && selectField) {
      setBasicInfoObj({
        ...basicInfoObj,
        [selectField.name]: "",
      });
      return;
    }

    const value = selectField
      ? Array.isArray(e)
        ? filterSelectedSkills(e)
        : e?.value || ""
      : e.target.value;

    setBasicInfoObj({
      ...basicInfoObj,
      [name]: value,
    });
  };

  const handleInputChangeDate = (date, name) => {
    // Clear error when date is selected
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }

    setBasicInfoObj({
      ...basicInfoObj,
      [name]: date,
    });
  };

  const filterSelectedSkills = (skills) => {
    return skills.map((item) => item.value);
  };

  const onSelectingFiles = (files) => {
    setAttachments(files);
  };

  const onSubmitForm = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }
    
    setLoader(true);
    const data = { ...basicInfoObj };
    data.expectedCompletionDate = moment(data.expectedCompletionDate).format(
      "YYYY-MM-DD"
    );
    const result = await saveProject(data);
    if (result) {
      if (attachments.length) {
        const formData = new FormData();
        attachments.forEach((file) => {
          formData.append("attachments", file);
        });
        const fileResult = await uploadAttachments(formData, result.projectId);
        if (fileResult) {
          setShowToastr(result);
          resetBasicInfoObj();
          router.push("/manage-projects");
        }
        setLoader(false);
      } else {
        setLoader(false);
        router.push("/manage-projects");
      }
    }
  };

  // Helper function to get the current value for react-select components
  const getSelectValue = (name, options) => {
    if (Array.isArray(basicInfoObj[name])) {
      return options.filter(option => 
        basicInfoObj[name].includes(option.value)
      );
    }
    return options.find(option => option.value === basicInfoObj[name]);
  };

  return (
    <>
      {loader && (
        <div className="loader-overlay">
          <InfinitySpin
            height={200}
            width={200}
            color="#00BFFF"
            ariaLabel="loading"
          />
        </div>
      )}
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Basic Information</h5>
        </div>
        <div className="col-xl-8">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Project Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    name="title"
                    value={basicInfoObj.title}
                    onChange={handleInputChange}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Category
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.projectCategory ? 'is-invalid' : ''}`}
                    className={`${errors.projectCategory ? 'is-invalid' : ''}`}
                    isClearable
                    name="projectCategory"
                    value={getSelectValue('projectCategory', meta.services)}
                    options={meta.services}
                    onChange={(e) => handleInputChange(e, { name: 'projectCategory' })}
                  />
                  {errors.projectCategory && <div className="invalid-feedback">{errors.projectCategory}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Freelancer Type
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.freelancerType ? 'is-invalid' : ''}`}
                    className={`${errors.freelancerType ? 'is-invalid' : ''}`}
                    isClearable
                    name="freelancerType"
                    value={getSelectValue('freelancerType', localMetaData.freeLancerType)}
                    options={localMetaData.freeLancerType}
                    onChange={(e) => handleInputChange(e, { name: 'freelancerType' })}
                  />
                  {errors.freelancerType && <div className="invalid-feedback">{errors.freelancerType}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Price type
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.priceType ? 'is-invalid' : ''}`}
                    className={`${errors.priceType ? 'is-invalid' : ''}`}
                    isClearable
                    name="priceType"
                    value={getSelectValue('priceType', localMetaData.priceTypes)}
                    options={localMetaData.priceTypes}
                    onChange={(e) => handleInputChange(e, { name: 'priceType' })}
                  />
                  {errors.priceType && <div className="invalid-feedback">{errors.priceType}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Cost
                  </label>
                  <CurrencyInput
                    className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
                    prefix="$"
                    name="cost"
                    placeholder="Please enter a number"
                    value={basicInfoObj.cost}
                    onValueChange={handleCurrencyInputChange}
                  />
                  {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Expected Completion Date
                  </label>
                  <div>
                    <DatePicker
                      className={`form-control w-100 ${errors.expectedCompletionDate ? 'is-invalid' : ''}`}
                      selected={basicInfoObj.expectedCompletionDate}
                      dateFormat="MM-dd-yyyy"
                      placeholderText="MM-DD-YYYY"
                      onChange={(date) =>
                        handleInputChangeDate(date, "expectedCompletionDate")
                      }
                    />
                    {errors.expectedCompletionDate && <div className="invalid-feedback">{errors.expectedCompletionDate}</div>}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Level
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.level ? 'is-invalid' : ''}`}
                    className={`${errors.level ? 'is-invalid' : ''}`}
                    isClearable
                    name="level"
                    value={getSelectValue('level', localMetaData.levels)}
                    options={localMetaData.levels}
                    onChange={(e) => handleInputChange(e, { name: 'level' })}
                  />
                  {errors.level && <div className="invalid-feedback">{errors.level}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Language
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.language ? 'is-invalid' : ''}`}
                    className={`${errors.language ? 'is-invalid' : ''}`}
                    isClearable
                    name="language"
                    value={getSelectValue('language', meta.languages)}
                    options={meta.languages}
                    onChange={(e) => handleInputChange(e, { name: 'language' })}
                  />
                  {errors.language && <div className="invalid-feedback">{errors.language}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Language Level
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.languageLevel ? 'is-invalid' : ''}`}
                    className={`${errors.languageLevel ? 'is-invalid' : ''}`}
                    isClearable
                    name="languageLevel"
                    value={getSelectValue('languageLevel', localMetaData.languageLevels)}
                    options={localMetaData.languageLevels}
                    onChange={(e) => handleInputChange(e, { name: 'languageLevel' })}
                  />
                  {errors.languageLevel && <div className="invalid-feedback">{errors.languageLevel}</div>}
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Required Skills on Project
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.projectSkills ? 'is-invalid' : ''}`}
                    className={`${errors.projectSkills ? 'is-invalid' : ''}`}
                    isClearable
                    isMulti
                    name="projectSkills"
                    value={getSelectValue('projectSkills', meta.skills)}
                    options={meta.skills}
                    onChange={(e) => handleInputChange(e, { name: 'projectSkills' })}
                  />
                  {errors.projectSkills && <div className="invalid-feedback">{errors.projectSkills}</div>}
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Project Detail
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder="Description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    name="description"
                    value={basicInfoObj.description}
                    onChange={handleInputChange}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
              </div>
              <div className="col-md-12">
                <UploadAttachment
                  doNotshowSaveButton={true}
                  onSelectingFiles={onSelectingFiles}
                />
              </div>
              <div className="col-md-12">
                <div className="text-start">
                  <button
                    type="button"
                    className="ud-btn btn-thm"
                    onClick={onSubmitForm}
                  >
                    Save
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showToastr && <Toastr showToastr={showToastr} />}
    </>
  );
}