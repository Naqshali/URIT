"use client";

import { useState } from "react";
import globalStore from "@/store/global";
import servicesStore from "@/store/myprofile/services";
import { localMetaData } from "@/utils/localMetaData";
import Select from "react-select";
import Toastr from "@/components/toastr/toastr";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";

export default function BasicInformation() {
  const router = useRouter();
  const { meta } = globalStore();
  const { saveService } = servicesStore();

  const [showToastr, setShowToastr] = useState(false);
  const [basicInfoObj, setBasicInfoObj] = useState({
    title: "",
    serviceCategory: "",
    price: "",
    description: "",
    country: "",
    city: "",
    languageLevel: "",
    serviceSkills: [],
    description: "",
  });

  const resetBasicInfoObj = () => {
    const obj = {
      title: "",
      serviceCategory: "",
      price: "",
      description: "",
      country: "",
      city: "",
      languageLevel: "",
      serviceSkills: [],
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

  const filterSelectedSkills = (skills) => {
    return skills.map((item) => item.value);
  };

  const onSubmitForm = async () => {
    const result = await saveService(basicInfoObj);
    if (result) {
      setShowToastr(result);
      resetBasicInfoObj();
      router.push("/manage-services");
    }
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
                  <CurrencyInput
                    className="form-control"
                    prefix="$"
                    name="price"
                    placeholder="Please enter a number"
                    value={basicInfoObj.price}
                    onValueChange={handleCurrencyInputChange}
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
                      (option) => option.value === basicInfoObj.country
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
                    value={basicInfoObj.city}
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
                    name="serviceCategory"
                    value={meta.services.find(
                      (option) => option.value === basicInfoObj.serviceCategory
                    )}
                    options={meta.services}
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
              <div className="col-sm-8">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Skills
                  </label>
                  <Select
                    classNamePrefix="custom"
                    isClearable
                    isMulti
                    name="serviceSkills"
                    options={meta.skills}
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
                    name="description"
                    value={basicInfoObj.description}
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
