"use client";
import { useState, useEffect } from "react";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";
import Select from "react-select";

export default function Skill({ meta }) {
  const { allSkills, getSkills, updateSkills } = profileStore();
  const [showToastr, setShowToastr] = useState(false);
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    skills.forEach((skill, index) => {
      if (!skill.name) {
        newErrors[`skillName_${index}`] = "Skill name is required";
        isValid = false;
      }
      
      if (!skill.points) {
        newErrors[`skillPoints_${index}`] = "Points are required";
        isValid = false;
      } else if (isNaN(skill.points)) {
        newErrors[`skillPoints_${index}`] = "Points must be a number";
        isValid = false;
      } else if (parseInt(skill.points) < 0 || parseInt(skill.points) > 100) {
        newErrors[`skillPoints_${index}`] = "Points must be between 0 and 100";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e, selectField, itemIndex) => {
    if (!e && selectField) {
      const newSkills = skills.map((skill, ind) => {
        return ind === itemIndex ? { ...skill, [selectField.name]: "" } : skill;
      });

      setSkills(newSkills);
      
      // Clear error when field is cleared
      if (selectField.name === 'name') {
        setErrors(prev => ({...prev, [`skillName_${itemIndex}`]: undefined}));
      }
      return;
    }

    const name = selectField ? selectField.name : e.target.name;
    const value = selectField ? e.value : e.target.value;

    const newSkills = skills.map((skill, ind) => {
      return ind === itemIndex ? { ...skill, [name]: value } : skill;
    });

    setSkills(newSkills);
    
    // Clear error when field is changed
    if (name === 'name') {
      setErrors(prev => ({...prev, [`skillName_${itemIndex}`]: undefined}));
    } else if (name === 'points') {
      setErrors(prev => ({...prev, [`skillPoints_${itemIndex}`]: undefined}));
    }
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
    
    // Remove related errors
    const newErrors = {...errors};
    delete newErrors[`skillName_${index}`];
    delete newErrors[`skillPoints_${index}`];
    
    // Reindex remaining errors
    const updatedErrors = {};
    Object.keys(newErrors).forEach(key => {
      const [type, oldIndex] = key.split('_');
      if (oldIndex > index) {
        updatedErrors[`${type}_${oldIndex - 1}`] = newErrors[key];
      } else if (oldIndex < index) {
        updatedErrors[key] = newErrors[key];
      }
    });
    
    setErrors(updatedErrors);
  };

  const onSubmitForm = async () => {
    if (!validateForm()) {
      setShowToastr({ type: "error", message: "Please fix all errors before submitting" });
      return;
    }
    
    const result = await updateSkills(skills);
    if (result) {
      setShowToastr(result);
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
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
                      <label className="heading-color ff-heading fw500 mb10">
                        {"Skill " + (ind + 1)}
                      </label>
                      <Select
                        classNamePrefix="custom"
                        isClearable={true}
                        name="name"
                        value={meta.skills.find(
                          (option) => option.value === item.name
                        )}
                        options={meta.skills}
                        onChange={(e, selected) =>
                          handleInputChange(e, selected, ind)
                        }
                        className={errors[`skillName_${ind}`] ? "is-invalid" : ""}
                      />
                      {errors[`skillName_${ind}`] && (
                        <div className="text-danger small mt-1">
                          {errors[`skillName_${ind}`]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Points
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className={`form-control ${errors[`skillPoints_${ind}`] ? "is-invalid" : ""}`}
                        name="points"
                        value={item.points}
                        onChange={(e) => handleInputChange(e, null, ind)}
                      />
                      {errors[`skillPoints_${ind}`] && (
                        <div className="text-danger small mt-1">
                          {errors[`skillPoints_${ind}`]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-2 skill-plus-minus-icon mt-15">
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