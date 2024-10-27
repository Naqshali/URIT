"use client";
import { Tooltip } from "react-tooltip";
import { dateInStringFormat } from "@/utils/global";
import globalMixin from "@/mixins/global";
import signUpStore from "@/store/signUp";

export default function ManageProjectCard({
  item,
  openEditProjectModal,
  openProposalModal,
}) {
  const { getService } = globalMixin();
  const { loggedInUser } = signUpStore();

  const onEditProject = () => {
    openEditProjectModal(item);
  };

  const onViewProposal = () => {
    openProposalModal(item);
  };
  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
            <div className="d-lg-flex px-0">
              <div className="details mb15-md-md">
                <h5 className="title mb10">{item.title}</h5>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-30-days fz16 vam text-thm2 me-1" />{" "}
                  {dateInStringFormat(item.createdAt)}
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm text-thm">
                  <i className="flaticon-contract fz16 vam me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  1 Received
                </p>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span className="fz15 fw400">{getService(item.projectCategory)}</span>
        </td>
        <td className="vam">
          <span className="fz14 fw400">${item.cost}/Fixed</span>
        </td>
        <td>
          <div className="d-flex">
            <a
              className="icon me-2"
              id="proposal"
              data-bs-toggle="modal"
              data-bs-target="#proposalModal"
              onClick={() => onViewProposal()}
            >
              <Tooltip
                anchorSelect="#proposal"
                className="ui-tooltip"
                place="top"
              >
                View Proposal
              </Tooltip>
              <i className="fa-regular fa-handshake"></i>
            </a>
            <a
              className="icon me-2"
              id="view"
              data-bs-toggle="modal"
              data-bs-target="#viewProjectModal"
              onClick={() => onEditProject()}
            >
              <Tooltip anchorSelect="#view" className="ui-tooltip" place="top">
                View
              </Tooltip>
              <span className="fas fa-eye" />
            </a>
            {loggedInUser?.userType === "CLIENT" && (
              <a
                className="icon me-2"
                id="edit"
                data-bs-toggle="modal"
                data-bs-target="#editProjectModal"
                onClick={() => onEditProject()}
              >
                <Tooltip
                  anchorSelect="#edit"
                  className="ui-tooltip"
                  place="top"
                >
                  Edit
                </Tooltip>
                <span className="flaticon-pencil" />
              </a>
            )}
            {/* {loggedInUser?.userType === "CLIENT" && (
              <a
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
              </a>
            )} */}
          </div>
        </td>
      </tr>
    </>
  );
}
