"use client";

import { useEffect, useRef, useState } from "react";
import globalStore from "@/store/global";
import servicesStore from "@/store/myprofile/services";
import { localMetaData } from "@/utils/localMetaData";
import Select from "react-select";
import Toastr from "@/components/toastr/toastr";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/navigation";

export default function EditServiceModal({ editRecord, onCloseModal }) {
  const router = useRouter();
  const { meta } = globalStore();
  const { updateService } = servicesStore();
  const buttonRef = useRef(null);
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
    deliveryTime: "",
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

  useEffect(() => {
    if (editRecord) {
      const record = { ...editRecord };
      if (record.serviceProvider) {
        delete record.serviceProvider;
      }

      let skillsValueOnly = [];
      if (record.serviceSkills.length) {
        skillsValueOnly = record.serviceSkills.map((item) => item);
      }
      record.serviceSkills = skillsValueOnly;
      setBasicInfoObj(record);
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
      basicInfoObj.serviceSkills.some((pSkill) => pSkill === option.value)
    );
    return result;
  };

  const onCloseProjectModal = () => {
    onCloseModal();
  };

  const onSubmitForm = async () => {
    delete basicInfoObj.id;
    delete basicInfoObj.createdAt;
    delete basicInfoObj.updatedAt;
    delete basicInfoObj.updatedAt;

    const result = await updateService(basicInfoObj, editRecord.id);
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
        id="editServiceModal"
        tabIndex={-1}
        aria-labelledby="editServiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content position-relative">
            <div className="modal-header sticky-header">
              <h5 className="modal-title">
                Edit Service
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
                          (option) =>
                            option.value === basicInfoObj.serviceCategory
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
                          (option) =>
                            option.value === basicInfoObj.languageLevel
                        )}
                        options={localMetaData.languageLevels}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
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
                        value={getSkillObject()}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Delivery Time (Days)
                      </label>
                      <CurrencyInput
                        className="form-control"
                        name="deliveryTime"
                        placeholder="Please enter a number"
                        value={basicInfoObj.deliveryTime}
                        maxLength={3}
                        onValueChange={handleCurrencyInputChange}
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
