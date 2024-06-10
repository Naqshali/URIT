"use client";
import { useState, useEffect } from "react";
import SelectInput from "../option/SelectInput";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";

export default function Skill({ meta }) {
  const { allSkills, getSkills, updateSkills } = profileStore();
  const [showToastr, setShowToastr] = useState(false);
  const [skills, setSkills] = useState([
    {
      name: "",
      points: "",
    },
  ]);

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (allSkills && allSkills.length) {
      setSkills(allSkills);
    }
  }, [allSkills]);

  const fetchSkills = async () => {
    await getSkills();
  };

  const handleInputChange = (e, selectField, itemIndex) => {
    const { name, value, index } = selectField || e.target;
    const mainIndex = itemIndex !== undefined ? itemIndex : index;
    const newSkills = skills.map((skill, ind) => {
      return ind === mainIndex ? { ...skill, [name]: value } : skill;
    });

    console.log("newSkills", newSkills);
    setSkills(newSkills);
  };

  const addNewSkill = () => {
    const newSkill = {
      name: "",
      points: "",
    };
    setSkills([...skills, newSkill]);
  };

  const removeNewSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const onSubmitForm = async () => {
    const result = await updateSkills(skills);
    if (result) {
      setShowToastr(result);
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Skills</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1">
              {skills.map((item, ind) => (
                <div className="row" key={ind}>
                  <div className="col-sm-5">
                    <div className="mb20">
                      <SelectInput
                        label={"Skill " + (ind + 1)}
                        defaultValue={item.name}
                        name="name"
                        index={ind}
                        data={meta.skills}
                        handler={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Points
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="points"
                        value={item.points}
                        onChange={(e) => handleInputChange(e, null, ind)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 skill-plus-minus-icon">
                    {ind === skills.length - 1 && (
                      <button
                        type="button"
                        className="plus-minus-icon"
                        onClick={() => addNewSkill()}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    )}
                    {skills.length > 1 && (
                      <button
                        type="button"
                        className="plus-minus-icon ml-4"
                        onClick={() => removeNewSkill(ind)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
            </form>
          </div>
        </div>
      </div>
      {showToastr && <Toastr showToastr={showToastr} />}
    </>
  );
}
