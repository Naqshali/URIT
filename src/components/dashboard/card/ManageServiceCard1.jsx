"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import globalMixin from "@/mixins/global";

export default function ManageServiceCard1({ item, openEditServiceModal }) {
  const { getService } = globalMixin();

  const onEditService = () => {
    openEditServiceModal(item);
  };

  return (
    <>
      <tr>
        <th className="dashboard-img-service" scope="row">
          <div className="listing-style1 list-style d-block d-xl-flex align-items-start border-0 mb-0">
            <div className="list-content flex-grow-1 p-0 pl0-lg">
              <h5 className="title mb10">{item.title}</h5>
            </div>
          </div>
        </th>
        <td className="align-top">
          <span className="fz15 fw400">{getService(item.serviceCategory)}</span>
        </td>
        <td className="align-top">
          <span className="fz14 fw400">${item.price}/Fixed</span>
        </td>
        <td className="align-top">
          <div className="d-flex">
            <a
              className="icon me-2"
              id="edit"
              data-bs-toggle="modal"
              data-bs-target="#editServiceModal"
              onClick={() => onEditService()}
            >
              <Tooltip anchorSelect="#edit" className="ui-tooltip" place="top">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </a>
            {/* <a
              className="icon"
              id="delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <Tooltip
                anchorSelect="#delete"
                place="top"
                className="ui-tooltip"
              >
                Delete
              </Tooltip>
              <span className="flaticon-delete" />
            </a> */}
          </div>
        </td>
      </tr>
    </>
  );
}
