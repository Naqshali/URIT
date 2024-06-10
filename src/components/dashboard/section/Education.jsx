"use client";
import { Tooltip } from "react-tooltip";
import EducationModal from "@/components/dashboard/modal/Education";
import { useEffect, useState } from "react";
import profileStore from "@/store/myprofile/profile";
import { dateFormat } from "@/utils/global";

export default function Education() {
  const { education, getEducation } = profileStore();
  const [educationList, setEducationList] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  useEffect(() => {
    if (education) {
      setEducationList(education);
    }
  }, [education]);

  const fetchEducation = async () => {
    await getEducation();
  };

  const editEducationRecord = (record) => {
    setEditRecord(record);
  };

  const educationAdded = async () => {
    await fetchEducation();
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Education</h5>
          <a data-bs-toggle="modal" data-bs-target="#educationModal">
            <i className="icon far fa-plus mr10" />
            Add Education
          </a>
        </div>
        <div className="position-relative">
          {educationList.map((item, ind) => (
            <div className="educational-quality" key={ind}>
              <div className="m-circle text-thm">Y</div>
              <div className="wrapper mb40 position-relative">
                <div className="del-edit">
                  <div className="d-flex">
                    <a
                      className="icon me-2"
                      id="edit"
                      onClick={() => editEducationRecord(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#educationModal"
                    >
                      <Tooltip
                        anchorSelect="#edit"
                        className="ui-tooltip"
                        data-bs-toggle="modal"
                        data-bs-target="#educationModal"
                      >
                        Edit
                      </Tooltip>
                      <span className="flaticon-pencil" />
                    </a>
                    <a className="icon" id="delete">
                      <Tooltip anchorSelect="#delete" className="ui-tooltip">
                        Delete
                      </Tooltip>
                      <span className="flaticon-delete" />
                    </a>
                  </div>
                </div>
                <span className="tag">
                  {dateFormat(item.startYear)} - {dateFormat(item.endYear)}
                </span>
                <h5 className="mt15">{item.degree}</h5>
                <h6 className="text-thm">{item.institution}</h6>
                <p>{item.description}</p>
              </div>
              <div className="m-circle before-none text-thm">Y</div>
            </div>
          ))}
        </div>
      </div>
      <EducationModal editRecord={editRecord} educationAdded={educationAdded} />
    </>
  );
}
