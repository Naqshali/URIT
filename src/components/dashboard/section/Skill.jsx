"use client";
import { useState, useEffect } from "react";
import SelectInput from "../option/SelectInput";
import profileStore from "@/store/myprofile/profile";
import Toastr from "@/components/toastr/toastr";

export default function Skill() {
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

  const handleInputChange = (e, selectField) => {
    const { name, value, index } = selectField;
    const newSkills = skills.map((skill, ind) => {
      return ind === index ? { ...skill, [name]: value } : skill;
    });

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
                        data={[
                          {
                            option: "Designer",
                            value: "designer",
                          },
                          {
                            option: "UI/UX",
                            value: "ui-ux",
                          },
                        ]}
                        handler={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb20">
                      <SelectInput
                        label="Point"
                        defaultValue={item.points}
                        name="points"
                        index={ind}
                        data={[
                          {
                            option: "80",
                            value: "80",
                          },
                          {
                            option: "90",
                            value: "90",
                          },
                        ]}
                        handler={handleInputChange}
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
