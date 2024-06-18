"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import projectsStore from "@/store/myprofile/projects";
import EditProjectModal from "@/components/dashboard/modal/editProjectModal";

const tab = [
  "Posted Projects",
  "Ongoing Projects",
  "Completed Services",
  "Canceled Services",
];

export default function ManageProjectInfo() {
  const { size, allProjects, getProjects } = projectsStore();

  const [selectedTab, setSelectedTab] = useState(0);
  const [projectsList, setProjectsList] = useState([]);
  const [userId, setUserId] = useState();
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("user_profile_id");
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  useEffect(() => {
    setProjectsList(allProjects.projects);
  }, [allProjects]);

  const fetchProjects = async (pageNo, status) => {
    const params = {
      userId: userId,
      pageNumber: pageNo ?? 0,
      pageSize: size,
      ...(status && { status: status }),
    };

    await getProjects(params);
  };

  const onSelectingTab = (selectedTab) => {
    setSelectedTab(selectedTab);
    fetchProjects(0, tab[selectedTab]);
  };

  const onSelectPage = (pageNo) => {
    fetchProjects(pageNo);
  };

  const openEditProjectModal = (item) => {
    setEditRecord(item);
  };

  const onCloseModal = (item) => {
    setEditRecord(null);
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
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${
                          selectedTab == i ? "active" : ""
                        }`}
                        onClick={() => onSelectingTab(i)}
                      >
                        {item}
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
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {projectsList.map((item, ind) => (
                        <ManageProjectCard
                          key={ind}
                          item={item}
                          openEditProjectModal={openEditProjectModal}
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
      <DeleteModal />
      {/* <ProposalModal1 /> */}
    </>
  );
}
