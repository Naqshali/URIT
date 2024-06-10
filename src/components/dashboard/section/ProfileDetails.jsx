"use client";
import React, { useEffect, useState } from "react";
import SelectInput from "../option/SelectInput";
import Image from "next/image";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";
import { localMetaData } from "@/utils/localMetaData";

export default function ProfileDetails({ meta }) {
  const { profileDetails, getProfileDetails, updateProfileDetails } =
    profileStore();

  const [profileObj, setProfileObj] = useState({
    username: "",
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
    const field = selectField || e.target;
    const { name, value } = field;

    setProfileObj({
      ...profileObj,
      [name]: value,
    });
  };

  const onSubmitForm = async (e) => {
    const result = await updateProfileDetails(profileObj);
    if (result) {
      setShowToastr(result);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

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
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={profileObj.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profileObj.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={profileObj.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hourlyRate"
                    value={profileObj.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Gender"
                    defaultValue={profileObj.gender}
                    name="gender"
                    data={localMetaData.genders}
                    handler={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Country"
                    defaultValue={profileObj.country}
                    name="country"
                    data={meta.countries}
                    handler={handleInputChange}
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
                  <SelectInput
                    label="Language"
                    defaultValue={profileObj.language}
                    name="language"
                    data={meta.languages}
                    handler={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Languages Level"
                    defaultValue={profileObj.languageLevel}
                    name="languageLevel"
                    data={localMetaData.languageLevels}
                    handler={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Introduce Yourself
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder="Description"
                    name="description"
                    value={profileObj.description}
                    onChange={handleInputChange}
                  />
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
