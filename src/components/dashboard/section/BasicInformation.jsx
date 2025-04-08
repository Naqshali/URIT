"use client";

import { useState } from "react";
import globalStore from "@/store/global";
import servicesStore from "@/store/myprofile/services";
import { localMetaData } from "@/utils/localMetaData";
import Select from "react-select";
import Toastr from "@/components/toastr/toastr";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";

export default function BasicInformation() {
  const router = useRouter();
  const { meta } = globalStore();
  const { saveService } = servicesStore();
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
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
    deliveryTime: "",
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!basicInfoObj.title.trim()) newErrors.title = "Service title is required";
    if (!basicInfoObj.serviceCategory) newErrors.serviceCategory = "Category is required";
    if (!basicInfoObj.price) newErrors.price = "Price is required";
    if (!basicInfoObj.country) newErrors.country = "Country is required";
    if (!basicInfoObj.city.trim()) newErrors.city = "City is required";
    if (!basicInfoObj.languageLevel) newErrors.languageLevel = "Language level is required";
    if (!basicInfoObj.serviceSkills || basicInfoObj.serviceSkills.length === 0) newErrors.serviceSkills = "At least one skill is required";
    if (!basicInfoObj.deliveryTime) newErrors.deliveryTime = "Delivery time is required";
    if (!basicInfoObj.description.trim()) newErrors.description = "Service description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      deliveryTime: "",
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

  const filterSelectedSkills = (skills) => {
    return skills.map((item) => item.value);
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
    const result = await saveService(basicInfoObj);
    setLoader(false);
    if (result) {
      setShowToastr(result);
      resetBasicInfoObj();
      router.push("/manage-services");
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
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Service Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={basicInfoObj.title}
                    name="title"
                    onChange={handleInputChange}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Price
                  </label>
                  <CurrencyInput
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    prefix="$"
                    name="price"
                    placeholder="Please enter a number"
                    value={basicInfoObj.price}
                    onValueChange={handleCurrencyInputChange}
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Country
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.country ? 'is-invalid' : ''}`}
                    className={`${errors.country ? 'is-invalid' : ''}`}
                    isClearable
                    name="country"
                    value={getSelectValue('country', meta.countries)}
                    options={meta.countries}
                    onChange={(e) => handleInputChange(e, { name: 'country' })}
                  />
                  {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    City
                  </label>
                  <input
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    name="city"
                    value={basicInfoObj.city}
                    onChange={handleInputChange}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Category
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.serviceCategory ? 'is-invalid' : ''}`}
                    className={`${errors.serviceCategory ? 'is-invalid' : ''}`}
                    isClearable
                    name="serviceCategory"
                    value={getSelectValue('serviceCategory', meta.services)}
                    options={meta.services}
                    onChange={(e) => handleInputChange(e, { name: 'serviceCategory' })}
                  />
                  {errors.serviceCategory && <div className="invalid-feedback">{errors.serviceCategory}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    English Level
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
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Skills
                  </label>
                  <Select
                    classNamePrefix={`custom-select ${errors.serviceSkills ? 'is-invalid' : ''}`}
                    className={`${errors.serviceSkills ? 'is-invalid' : ''}`}
                    isClearable
                    isMulti
                    name="serviceSkills"
                    value={getSelectValue('serviceSkills', meta.skills)}
                    options={meta.skills}
                    onChange={(e) => handleInputChange(e, { name: 'serviceSkills' })}
                  />
                  {errors.serviceSkills && <div className="invalid-feedback">{errors.serviceSkills}</div>}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Delivery Time (Days)
                  </label>
                  <CurrencyInput
                    className={`form-control ${errors.deliveryTime ? 'is-invalid' : ''}`}
                    name="deliveryTime"
                    placeholder="Please enter a number"
                    value={basicInfoObj.deliveryTime}
                    maxLength={3}
                    onValueChange={handleCurrencyInputChange}
                  />
                  {errors.deliveryTime && <div className="invalid-feedback">{errors.deliveryTime}</div>}
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
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    name="description"
                    value={basicInfoObj.description}
                    onChange={handleInputChange}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
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