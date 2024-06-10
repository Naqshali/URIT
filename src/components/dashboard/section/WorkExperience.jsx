"use client";
import { Tooltip } from "react-tooltip";
import WorkExperienceModal from "@/components/dashboard/modal/WorkExperiance";
import { useEffect, useState } from "react";
import profileStore from "@/store/myprofile/profile";
import { dateFormat } from "@/utils/global";

export default function WorkExperience() {
  const { workExperiance, getWorkExperiance } = profileStore();
  const [workExperianceList, setWorkExperianceList] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchWorkExperiance();
  }, []);

  useEffect(() => {
    if (workExperiance && workExperiance.length) {
      setWorkExperianceList(workExperianceList);
    }
  }, [workExperiance]);

  const fetchWorkExperiance = async () => {
    await getWorkExperiance();
  };

  const editWorkExpeianceRecord = (record) => {
    setEditRecord(record);
  };

  const workExperianceAdded = async (added) => {
    setEditRecord(null);
    if (added) {
      await fetchWorkExperiance();
    }
  };
  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Work &amp; Experience</h5>
          <a data-bs-toggle="modal" data-bs-target="#workExperianceModal">
            <i className="icon far fa-plus mr10" />
            Add Experience
          </a>
        </div>
        <div className="position-relative">
          {workExperianceList.map((item, ind) => (
            <div className="educational-quality">
              <div className="m-circle text-thm">M</div>
              <div className="wrapper mb40 position-relative">
                <div className="del-edit">
                  <div className="d-flex">
                    <a className="icon me-2" id="edit">
                      <Tooltip
                        anchorSelect="#edit"
                        className="ui-tooltip"
                        onClick={() => editWorkExpeianceRecord(item)}
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
                <h5 className="mt15">{item.designation}</h5>
                <h6 className="text-thm">{item.company}</h6>
                <p>{item.description}</p>
              </div>
              <div className="m-circle before-none text-thm">M</div>
            </div>
          ))}
        </div>
        {workExperianceList.length === 0 && <div>No Work Experiance found</div>}
      </div>
      <WorkExperienceModal
        editRecord={editRecord}
        workExperianceAdded={workExperianceAdded}
      />
    </>
  );
}
