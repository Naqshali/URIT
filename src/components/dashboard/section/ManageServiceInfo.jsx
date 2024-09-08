"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useEffect, useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageServiceCard1 from "../card/ManageServiceCard1";
import { manageService } from "@/data/dashboard";
import ProposalModal1 from "../modal/ProposalModal1";
import EditServiceModal from "../modal/editServiceModal";
import DeleteModal from "../modal/DeleteModal";
import servicesStore from "@/store/myprofile/services";
import globalMixin from "@/mixins/global";
import signUpStore from "@/store/signUp";

const tab = ["Active Services"];

export default function ManageServiceInfo() {
  const { getAllListSize } = globalMixin();
  const [selectedTab, setSelectedTab] = useState(0);
  const [serviceList, setServiceList] = useState([]);
  const { allServices, getServices } = servicesStore();
  const { loggedInUser } = signUpStore();
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      fetchServices();
    }
  }, [loggedInUser]);

  useEffect(() => {
    setServiceList(allServices.services);
  }, [allServices]);

  const fetchServices = async (pageNo) => {
    const params = {
      userId: loggedInUser.userId,
      pageNumber: pageNo ?? 0,
      pageSize: getAllListSize,
    };

    await getServices(params);
  };

  const onSelectPage = (pageNo) => {
    fetchServices(pageNo);
  };

  const openEditServiceModal = (item) => {
    console.log("openEditServiceModal ~ item:", item);
    setEditRecord(item);
  };

  const onCloseModal = () => {
    setEditRecord(null);
    fetchServices();
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
              <h2>Manage Services</h2>
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
                        onClick={() => setSelectedTab(i)}
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
                        {/* <th scope="col">Actions</th> */}
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {serviceList.map((item, ind) => (
                        <ManageServiceCard1
                          key={ind}
                          item={item}
                          openEditServiceModal={openEditServiceModal}
                        />
                      ))}
                    </tbody>
                  </table>
                  {serviceList.length === 0 && (
                    <div className="text-align-center">No Services Found</div>
                  )}
                  {allServices.totalCount > 0 && (
                    <div className="mt30">
                      <Pagination1
                        totalCount={allServices.totalCount ?? 1}
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
      <EditServiceModal editRecord={editRecord} onCloseModal={onCloseModal} />
      <DeleteModal />
    </>
  );
}
