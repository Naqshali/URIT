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

  const [showToastr, setShowToastr] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [basicInfoObj, setBasicInfoObj] = useState({
    title: "",
    projectCategory: "",
    freelancerType: "",
    priceType: "",
    cost: "",
    description: "",
    // projectDuration: "",
    // projectDurationType: "",
    expectedCompletionDate: "",
    level: "",
    language: "",
    languageLevel: "",
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
      // projectDuration: "",
      // projectDurationType: "",
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
  const handleInputChangeDate = (date, name) => {
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
                    className="form-control"
                    name="title"
                    value={basicInfoObj.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Category
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="projectCategory"
                    value={meta.services.find(
                      (option) => option.value === basicInfoObj.projectCategory
                    )}
                    options={meta.services}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Freelancer Type
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="freelancerType"
                    value={localMetaData.freeLancerType.find(
                      (option) => option.value === basicInfoObj.freelancerType
                    )}
                    options={localMetaData.freeLancerType}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
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
              <div className="col-sm-6">
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
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Expected Completion Date
                  </label>
                  <div>
                    <DatePicker
                      className="form-control w-100"
                      selected={basicInfoObj.expectedCompletionDate}
                      dateFormat="MM-dd-yyyy"
                      placeholderText="MM-DD-YYYY"
                      onChange={(date) =>
                        handleInputChangeDate(date, "expectedCompletionDate")
                      }
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-sm-3">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Project Duration
                  </label>
                  <CurrencyInput
                    className="form-control"
                    maxLength={3}
                    name="projectDuration"
                    value={basicInfoObj.projectDuration}
                    onValueChange={handleCurrencyInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Project Duration
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="projectDurationType"
                    value={localMetaData.projectDurationTypes.find(
                      (option) =>
                        option.value === basicInfoObj.projectDurationType
                    )}
                    options={localMetaData.projectDurationTypes}
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Level
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="level"
                    value={localMetaData.levels.find(
                      (option) => option.value === basicInfoObj.level
                    )}
                    options={localMetaData.levels}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Language
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="language"
                    value={meta.languages.find(
                      (option) => option.value === basicInfoObj.language
                    )}
                    options={meta.languages}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Language Level
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="languageLevel"
                    value={localMetaData.languageLevels.find(
                      (option) => option.value === basicInfoObj.languageLevel
                    )}
                    options={localMetaData.languageLevels}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Required Skills on Project
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    isMulti
                    name="projectSkills"
                    options={meta.skills}
                    onChange={handleInputChange}
                  />
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
                    name="description"
                    value={basicInfoObj.description}
                    onChange={handleInputChange}
                  />
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
                    onClick={() => {
                      onSubmitForm();
                    }}
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
