"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useMemo, useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal from "../modal/Proposal";
import DeleteModal from "../modal/DeleteModal";
import projectsStore from "@/store/myprofile/projects";
import proposalsStore from "@/store/myprofile/proposals";
import EditProjectModal from "@/components/dashboard/modal/editProjectModal";
import signUpStore from "@/store/signUp";

export default function ManageProjectInfo() {
  const { size, allProjects, getProjects } = projectsStore();
  const { loggedInUser } = signUpStore();

  const [selectedTab, setSelectedTab] = useState(0);
  const [projectsList, setProjectsList] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  const { getProjectProposal } = proposalsStore();
  const [proposal, setProposal] = useState({});

  useEffect(() => {
    if (loggedInUser) {
      fetchProjects();
    }
  }, [loggedInUser]);

  useEffect(() => {
    setProjectsList(allProjects.projects);
  }, [allProjects]);

  const userType = useMemo(() => {
    return loggedInUser?.userType;
  });

  const fetchProjects = async (pageNo, status) => {
    const params = {
      userId: loggedInUser.userId,
      pageNumber: pageNo ?? 0,
      pageSize: size,
      ...(status && { status: status }),
      ...(userType === "SERVICE_PROVIDER" && {
        proposalSent: true,
      }),
    };

    await getProjects(params);
  };

  const filterTabs = () => {
    if (userType === "SERVICE_PROVIDER") {
      return [{ title: "Proposed Projects", status: "OPEN_FOR_PROPOSALS" }];
    }
    return [
      { title: "Posted Projects", status: "OPEN_FOR_PROPOSALS" },
      // { title: "Ongoing Projects", status: "IN_PROCESS" },
      // { title: "Completed Services", status: "COMPLETED_SERVICES" },
      // { title: "Canceled Services", status: "CANCELLED_SERVICES" },
    ];
  };

  const onSelectingTab = (selectedTab) => {
    setSelectedTab(selectedTab);
    fetchProjects(0, filterTabs()[selectedTab].status);
  };

  const onSelectPage = (pageNo) => {
    fetchProjects(pageNo);
  };

  const openEditProjectModal = (item) => {
    setEditRecord(item);
  };

  const onCloseModal = () => {
    setEditRecord(null);
    fetchProjects();
  };

  const openProposalModal = async (item) => {
    const result = await getProjectProposal(item.id, userType);
    if (result) {
      if (userType === "SERVICE_PROVIDER") {
        const obj = {
          client: item.client,
          coverLetter: result.coverLetter,
          hourlyRate: result.hourlyRate,
          estimatedHours: result.estimatedHours,
          projectName: item.title,
        };
        setProposal(obj);
      } else {
        const obj = {
          id: item.id,
          proposals: result.proposals.map((proposal) => ({
            ...proposal,
            projectName: item.title,
          })),
          totalCount: result.totalCount,
        };
        setProposal(obj);
      }
    } else {
      setProposal({ noProposals: true });
    }
  };

  const getNextProposalsList = async (page) => {
    const result = await getProjectProposal(proposal.id, userType, page);
    setProposal(result);
  };

  const onCloseProposalModal = (data) => {
    setProposal({});
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Project</h2>
            </div>
          </div>
          {userType !== "SERVICE_PROVIDER" && (
            <div className="col-lg-3">
              <div className="text-lg-end">
                <Link
                  href="/create-projects"
                  className="ud-btn btn-dark default-box-shadow2"
                >
                  Create Project
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {filterTabs().map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          selectedTab == i ? "active" : ""
                        }`}
                        onClick={() => onSelectingTab(i)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </nav>
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Type/Cost</th>
                        <th scope="col">
                          {userType === "SERVICE_PROVIDER"
                            ? "Proposal"
                            : "Actions"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {projectsList.map((item, ind) => (
                        <ManageProjectCard
                          key={ind}
                          item={item}
                          openEditProjectModal={openEditProjectModal}
                          openProposalModal={openProposalModal}
                        />
                      ))}
                    </tbody>
                  </table>
                  {projectsList.length === 0 && (
                    <div className="text-align-center">No Projects Found</div>
                  )}
                  {allProjects.totalCount > 0 && (
                    <div className="mt30">
                      <Pagination1
                        totalCount={allProjects.totalCount ?? 1}
                        onSelectPage={onSelectPage}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProjectModal editRecord={editRecord} onCloseModal={onCloseModal} />
      <ProposalModal
        record={proposal}
        getNextProposalsList={getNextProposalsList}
        onCloseProposalModal={onCloseProposalModal}
      />
      <DeleteModal />
    </>
  );
}
