"use client";

import { useState } from "react";
import SelectInput from "../option/SelectInput";
import globalStore from "@/store/global";
import { localMetaData } from "@/utils/localMetaData";
import Select from "react-select";

export default function BasicInformation() {
  const { meta } = globalStore();
  const [basicInfoObj, setBasicInfoObj] = useState({
    title: "",
    price: "",
    description: "",
    country: "",
    city: "",
    language: "",
    languageLevel: "",
    serviceSkills: [{ name: "", points: "" }],
    serviceDetail: "",
  });

  const resetBasicInfoObj = () => {
    const obj = {
      title: "",
      price: "",
      description: "",
      country: "",
      city: "",
      language: "",
      languageLevel: "",
      serviceSkills: [{ name: "", points: "" }],
    };
    setBasicInfoObj(obj);
  };

  const handleInputChange = (e, selectField) => {
    const name = selectField ? selectField.name : e.target.name;
    const value = selectField ? e.value : e.target.value;

    setBasicInfoObj({
      ...basicInfoObj,
      [name]: value,
    });
  };

  const getOptionValue = (option) => option.value;

  const onSubmitForm = () => {
    console.log("Aaa", basicInfoObj);
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Basic Information</h5>
        </div>
        <div className="col-xl-8">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Service Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={basicInfoObj.title}
                    name="title"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Price
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="price"
                    value={basicInfoObj.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    English Level
                  </label>
                  <Select
                    classNamePrefix="custom"
                    name="languageLevel"
                    getOptionValue={getOptionValue}
                    options={localMetaData.languageLevels}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                {basicInfoObj.serviceSkills.map((item, ind) => (
                  <div>
                    <div className="col-sm-8">
                      <div className="mb20">
                        <SelectInput
                          label="Skills"
                          defaultSelect={item.name}
                          data={meta.skills}
                          handler={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="mb20">
                        <div className="skill-plus-minus-icon mt40">
                          <button
                            type="button"
                            className="plus-minus-icon"
                            onClick={() => addNewSkill()}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>

                          <button
                            type="button"
                            className="plus-minus-icon ml-4"
                            onClick={() => removeNewSkill(ind)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <SelectInput
                    label="Country"
                    defaultSelect={basicInfoObj.country}
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
                    type="email"
                    className="form-control"
                    value={basicInfoObj.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb10">
                  <label className="heading-color ff-heading fw500 mb10">
                    Services Detail
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder="Description"
                    value={basicInfoObj.serviceDetail}
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
    </>
  );
}
