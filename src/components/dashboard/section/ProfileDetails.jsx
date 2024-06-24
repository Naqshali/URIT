"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profileStore from "@/store/myprofile/profile";
import signUpStore from "@/store/signUp";
import Toastr from "@/components/toastr/toastr";
import { localMetaData } from "@/utils/localMetaData";
import validations from "@/utils/validations";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";

export default function ProfileDetails({ meta }) {
  const { loggedInUser } = signUpStore();

  const { profileDetails, getProfileDetails, updateProfileDetails } =
    profileStore();

  const { isRequired, validateForm } = validations();

  const [profileObj, setProfileObj] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    tagLine: "",
    hourlyRate: "",
    gender: "",
    country: "",
    city: "",
    language: "",
    languageLevel: "",
    description: "",
  });

  const [showToastr, setShowToastr] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);

  useEffect(() => {
    console.log(meta);
    fetchProfileDetails();
  }, []);

  useEffect(() => {
    if (profileDetails) {
      setProfileObj(profileDetails);
    }
  }, [profileDetails]);

  const fetchProfileDetails = async () => {
    await getProfileDetails();
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

    setProfileObj({
      ...profileObj,
      [name]: value,
    });
  };

  const onSubmitForm = async () => {
    setFormSubmited(true);
    const { name, email, phoneNumber, hourlyRate, description } = profileObj;

    const profileValidatinoObject = {
      name,
      email,
      phoneNumber,
      description,
      ...(loggedInUser?.userType === "SERVICE_PROVIDER" && { hourlyRate }),
    };

    if (validateForm(profileValidatinoObject)) {
      const result = await updateProfileDetails(profileObj);
      if (result) {
        setShowToastr(result);
      }
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrencyInputChange = (e, name) => {
    const obj = {
      target: { name: name, value: e },
    };
    handleInputChange(obj);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(event);
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>
        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <Image
                height={71}
                width={71}
                className="rounded-circle wa-xs"
                src={selectedImage ? selectedImage : "/images/team/fl-1.png"}
                style={{
                  height: "71px",
                  width: "71px",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            </div>
            <div className="profile-content ml20 ml0-xs">
              <div className="d-flex align-items-center my-3">
                <a
                  className="tag-delt text-thm2"
                  onClick={() => setSelectedImage(null)}
                >
                  <span className="flaticon-delete text-thm2" />
                </a>
                <label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                  <a className="upload-btn ml10">Upload Images</a>
                </label>
              </div>
              <p className="text mb-0">
                Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                files are .jpg &amp; .png
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <form className="form-style1" autoComplete="off">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    User Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formSubmited && isRequired(profileObj.name)
                        ? "validation-error"
                        : ""
                    }`}
                    name="name"
                    value={profileObj.name}
                    onChange={handleInputChange}
                  />
                  <span className="validation-msg">
                    {formSubmited && isRequired(profileObj.name)}
                  </span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      formSubmited && isRequired(profileObj.email)
                        ? "validation-error"
                        : ""
                    }`}
                    name="email"
                    value={profileObj.email}
                    onChange={handleInputChange}
                  />
                </div>
                <span className="validation-msg">
                  {formSubmited && isRequired(profileObj.email)}
                </span>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formSubmited && isRequired(profileObj.phoneNumber)
                        ? "validation-error"
                        : ""
                    }`}
                    name="phoneNumber"
                    value={profileObj.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <span className="validation-msg">
                    {formSubmited && isRequired(profileObj.phoneNumber)}
                  </span>
                </div>
              </div>
              {loggedInUser?.userType === "SERVICE_PROVIDER" && (
                <div className="col-sm-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Tag Line
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="tagLine"
                      value={profileObj.tagLine}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {loggedInUser?.userType === "SERVICE_PROVIDER" && (
                <div className="col-sm-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Hourly Rate
                    </label>
                    <CurrencyInput
                      className={`form-control ${
                        formSubmited && isRequired(profileObj.hourlyRate)
                          ? "validation-error"
                          : ""
                      }`}
                      prefix="$"
                      name="hourlyRate"
                      placeholder="Please enter a number"
                      value={profileObj.hourlyRate}
                      onValueChange={handleCurrencyInputChange}
                    />
                    <span className="validation-msg">
                      {formSubmited && isRequired(profileObj.hourlyRate)}
                    </span>
                  </div>
                </div>
              )}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Gender
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="gender"
                    value={localMetaData.genders.find(
                      (option) => option.value === profileObj.gender
                    )}
                    options={localMetaData.genders}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Country
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    name="country"
                    value={meta.countries.find(
                      (option) => option.value === profileObj.country
                    )}
                    options={meta.countries}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    City
                  </label>
                  <input
                    className="form-control"
                    name="city"
                    value={profileObj.city}
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
                      (option) => option.value === profileObj.language
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
                      (option) => option.value === profileObj.languageLevel
                    )}
                    options={localMetaData.languageLevels}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Introduce Yourself
                  </label>
                  <textarea
                    className={`${
                      formSubmited && isRequired(profileObj.description)
                        ? "validation-error"
                        : ""
                    }`}
                    cols={30}
                    rows={6}
                    placeholder="Description"
                    name="description"
                    value={profileObj.description}
                    onChange={handleInputChange}
                  />
                  <span className="validation-msg">
                    {formSubmited && isRequired(profileObj.description)}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-start">
                  <button
                    type="button"
                    className="ud-btn btn-thm"
                    onClick={() => onSubmitForm()}
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
