"use client";
import { useState } from "react";
import SelectInput from "../option/SelectInput";
import Link from "next/link";
import profileStore from "@/store/myprofile/profile";

export default function Skill() {
  const { saveSkills } = profileStore();
  const [skills, setSkills] = useState([
    {
      skill: "",
      point: "",
    },
  ]);

  const handleInputChange = (e, selectField) => {
    const { name, value, index } = selectField;
    const newSkills = skills.map((skill, ind) => {
      return ind === index ? { ...skill, [name]: value } : skill;
    });

    setSkills(newSkills);
  };

  const addNewSkill = () => {
    const newSkill = {
      skill: "",
      point: "",
    };
    setSkills([...skills, newSkill]);
  };

  const removeNewSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await saveSkills(skills);
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Skills</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1" onSubmit={() => onSubmitForm()}>
              {skills.map((item, ind) => (
                <div className="row" key={ind}>
                  <div className="col-sm-5">
                    <div className="mb20">
                      <SelectInput
                        label={"Skill " + (ind + 1)}
                        defaultValue={item.skill}
                        name="skill"
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
                        defaultValue={item.point}
                        name="point"
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
                  <Link className="ud-btn btn-thm" href="/contact">
                    Save
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
