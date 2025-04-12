import ProjectContactWidget1 from "@/components/element/ProjectContactWidget1";
import Pagination1 from "@/components/section/Pagination1";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import proposalsStore from "@/store/myprofile/proposals";
import signUpStore from "@/store/signUp";
import Payments from "../section/payments";

import {
  connectChat,
  disconnectChat,
  sendMessage,
} from "@/services/ChatService";

export default function ProposalModal({
  record,
  getNextProposalsList,
  onCloseProposalModal,
}) {
  const router = useRouter();
  const { loggedInUser } = signUpStore();
  const { acceptProposal } = proposalsStore();
  const closeModalButtonRef = useRef(null);
  const channel = `/topic/urit/chat/${loggedInUser?.userId}`;
  const token = loggedInUser?.token;
  let client = null;
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (client) {
      return;
    }

    client = connectChat(token, channel);
    return () => {
      disconnectChat();
    };
  }, [token]);

  const onSelectPage = (page) => {
    getNextProposalsList(page);
  };

  const onAcceptProposal = async (proposal) => {
    setProceedToPayment(true);
    setSelectedProposal(proposal);
  };

  const onChat = (proposal) => {
    closeModalButtonRef.current.click();
    sendMessage({
      msg: "Proposal Accepted",
      senderId: loggedInUser.userId,
      proposalId: proposal.id,
      chatType: "Project Chat",
    });
    // router.push("/chats");
  };

  const onCloseModal = (e) => {
    setProceedToPayment(false);
    onCloseProposalModal();
  };

  return (
    <>
      <div>
        <div
          className="modal fade"
          id="proposalModal"
          tabIndex={-1}
          aria-labelledby="proposalModalLabel"
          aria-hidden="true"
          // onClick={(e) => onCloseModal(e)}
        >
          <div className="modal-dialog modal-dialog-centered modal-md ">
            <div className="modal-content position-relative">
              <div className="modal-header sticky-header">
                <h3 className="modal-title">Proposal</h3>
                <button
                  type="button"
                  className="btn-close position-absolute"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    top: "28px",
                    right: "25px",
                    zIndex: "9",
                    fontSize: "16px",
                  }}
                  ref={closeModalButtonRef}
                  onClick={() => onCloseModal()}
                />
              </div>
              {!proceedToPayment ? (
                <div>
                  <div className="modal-body p-4">
                    <div>
                      {!record.noProposals &&
                        record.proposals?.length &&
                        record.proposals.map((item, ind) => (
                          <div className="row proposal-list" key={ind}>
                            <div className="col-md-12">
                              <h5>Proposal by {item.serviceProvider.name}</h5>
                              <div>
                                <p>{item.coverLetter}</p>
                                <span>
                                  <strong>Estimated Hours:</strong>{" "}
                                  {item.estimatedHours}
                                </span>
                                <span className="ml20">
                                  <strong>Hourly Rate:</strong> $
                                  {item.hourlyRate}
                                </span>
                                <span className="ml20">
                                  <strong>Email:</strong>{" "}
                                  {item.serviceProvider.email}
                                </span>
                                <div>
                                  <a
                                    className="ud-btn btn-thm accept-proposal"
                                    onClick={() => onAcceptProposal(item)}
                                  >
                                    Accept Proposal
                                    <i className="fal fa-arrow-right-long fs12" />
                                  </a>
                                  <a
                                    className="ud-btn btn-thm accept-proposal ml-4"
                                    onClick={() => onChat(item)}
                                  >
                                    Chat
                                    <i className="fal fa-arrow-right-long fs12" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {!record.noProposals && !record.proposals && (
                      <div>
                        <h5>{record.title}</h5>
                        <div className="row">
                          <div className="col-md-8">
                            <div>
                              <p>{record.coverLetter}</p>
                              <div>
                                <span>
                                  <strong> Hourly Rate:</strong>{" "}
                                  {record.hourlyRate}
                                </span>{" "}
                                <span className="ml20">
                                  {" "}
                                  <strong>Estimated Hours:</strong>{" "}
                                  {record.estimatedHours}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <ProjectContactWidget1
                              clientData={record.client ? record.client : {}}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {record.noProposals && (
                    <div className="text-align-center mb50">
                      <span>No Proposals Found</span>
                    </div>
                  )}
                  <div>
                    {!record.noProposals && record.proposals?.length && (
                      <div className="modal-footer sticky-footer justify-content-center">
                        <Pagination1
                          totalCount={record.totalCount}
                          onSelectPage={onSelectPage}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p30">
                  <Payments selectedProposal={selectedProposal} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
