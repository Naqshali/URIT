"use client";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import AwardsModal from "@/components/dashboard/modal/Awards";
import profileStore from "@/store/myprofile/profile";
import { dateFormat } from "@/utils/global";

export default function Award() {
  const { awards, getAwards } = profileStore();
  const [awardsList, setAwardsList] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    fetchAwards();
  }, []);

  useEffect(() => {
    if (awards) {
      setAwardsList(awards);
    }
  }, [awards]);

  const fetchAwards = async () => {
    await getAwards();
  };

  const editAwardRecord = (record) => {
    setEditRecord(record);
  };

  const awardsAdded = async () => {
    setEditRecord(null);
    await fetchAwards();
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Awards</h5>
          <a data-bs-toggle="modal" data-bs-target="#awardsModal">
            <i className="icon far fa-plus mr10" />
            Add Awards
          </a>
        </div>
        <div className="position-relative">
          <div className="educational-quality ps-0">
            {awardsList.map((item, ind) => (
              <div className="wrapper mb40 position-relative" key={ind}>
                <div className="del-edit">
                  <div className="d-flex">
                    <a
                      className="icon me-2"
                      id="edit"
                      data-bs-toggle="modal"
                      data-bs-target="#awardsModal"
                      onClick={() => editAwardRecord(item)}
                    >
                      <Tooltip anchorSelect="#edit" className="ui-tooltip">
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
                <span className="tag">{dateFormat(item.issueDate)}</span>
                <h5 className="mt15">{item.title}</h5>
                <h6 className="text-thm">{item.issuedBy}</h6>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AwardsModal editRecord={editRecord} awardsAdded={awardsAdded} />
    </>
  );
}
