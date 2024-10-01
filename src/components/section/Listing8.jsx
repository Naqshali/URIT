"use client";
import { project1 } from "@/data/product";
import ProjectCard1 from "../card/ProjectCard1";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebar2 from "../sidebar/ListingSidebar2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import projectsStore from "@/store/myprofile/projects";
import profileStore from "@/store/myprofile/profile";
import { useEffect, useState } from "react";
import proposalsStore from "@/store/myprofile/proposals";
import { useSearchParams } from "next/navigation";

export default function Listing8() {
  const { size, allProjects, getProjects } = projectsStore();
  const { getProfileDetails } = profileStore();
  const { getProjectProposal } = proposalsStore;
  const [projectsList, setProjectsList] = useState({ projects: [] });
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  useEffect(() => {
    fetchProfileDetails();
    fetchAllProjects();
  }, []);

  const fetchProfileDetails = async () => {
    await getProfileDetails();
  };

  const fetchAllProjects = async (pageNo, status) => {
    const params = {
      pageNumber: pageNo ?? 0,
      pageSize: size,
      ...(status && { status: status }),
    };

    if (filter) {
      params.projectCategory = filter;
    }
    await getProjects(params, filter);
  };

  useEffect(() => {
    setProjectsList(allProjects);
  }, [allProjects]);

  const onSelectPage = (pageNo) => {
    fetchAllProjects(pageNo);
  };

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">{/* <ListingSidebar2 /> */}</div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={projectsList.projects?.length} />
              <div className="row">
                {projectsList.projects.map((item, i) => (
                  <div key={i} className="col-md-6 col-lg-12">
                    <ProjectCard1 data={item} />
                  </div>
                ))}
              </div>
              {projectsList.totalCount > 0 && (
                <div className="mt30">
                  <Pagination1
                    totalCount={projectsList.totalCount ?? 1}
                    onSelectPage={onSelectPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal2 />
    </>
  );
}
