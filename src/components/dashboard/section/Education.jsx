"use client";
import { Tooltip } from "react-tooltip";
import EducationModal from "@/components/dashboard/modal/Education";
import EducationDeleteModal from "@/components/dashboard/modal/DeleteModals/EducationDeleteModal";
import { useEffect, useState } from "react";
import profileStore from "@/store/myprofile/profile";
import { dateFormat } from "@/utils/global";
import Toastr from "@/components/toastr/toastr";

export default function Education({ meta }) {
  const { education, getEducation, deleteEducation } = profileStore();
  const [educationList, setEducationList] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [showToastr, setShowToastr] = useState(false);
  const [deletedRecordId, setDeleteRecordId] = useState(null);

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

  const educationAdded = async (added) => {
    setEditRecord(null);
    if (added) {
      await fetchEducation();
    }
  };

  const deleteEducationRecord = async (action) => {
    if (action) {
      const result = await deleteEducation(deletedRecordId);
      if (result) {
        setShowToastr(result);
        setDeleteRecordId(null);
        await fetchEducation();
      }
    }
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
                      <Tooltip anchorSelect="#edit" className="ui-tooltip">
                        Edit
                      </Tooltip>
                      <span className="flaticon-pencil" />
                    </a>
                    <a
                      className="icon"
                      id="delete"
                      data-bs-toggle="modal"
                      data-bs-target="#educationDeleteModal"
                      onClick={() => setDeleteRecordId(item.id)}
                    >
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
            </div>
          ))}
        </div>
        {educationList.length === 0 && <div>No Edcucation found</div>}
      </div>
      <EducationModal
        editRecord={editRecord}
        educationAdded={educationAdded}
        meta={meta}
      />
      {showToastr && <Toastr showToastr={showToastr} />}
      <EducationDeleteModal action={deleteEducationRecord} />
    </>
  );
}
