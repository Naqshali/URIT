"use client";
import { projectProposal1 } from "@/data/product";
import ProjectProposalCard1 from "../card/ProjectProposalCard1";
import ServiceDetailExtra1 from "../element/ServiceDetailExtra1";
import { Sticky, StickyContainer } from "react-sticky";
import ProjectPriceWidget1 from "../element/ProjectPriceWidget1";
import ProjectContactWidget1 from "../element/ProjectContactWidget1";
import useScreen from "@/hook/useScreen";
import proposalsStore from "@/store/myprofile/proposals";
import projectsStore from "@/store/myprofile/projects";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useParams } from "next/navigation";
import globalMixin from "@/mixins/global";
import { useRouter } from "next/navigation";
import FileViewer from "../dashboard/modal/fileViewerModal";

export default function ProjectDetail1() {
  const router = useRouter();
  const routeParams = useParams();
  const isMatchedScreen = useScreen(1216);
  const { submitProposal } = proposalsStore();
  const { singleProject, getSingleProject } = projectsStore();
  const { getService, getSkill, getfileName, getfileType } = globalMixin();
  const [file, setFile] = useState(null);

  const [project, setProject] = useState({});
  const [propodalObj, setProposalObj] = useState({
    coverLetter: "",
    hourlyRate: "",
    estimatedHours: "",
  });

  useEffect(() => {
    findSingleProject();
  }, []);

  useEffect(() => {
    if (singleProject) {
      setProject(singleProject);
    }
  }, [singleProject]);

  const findSingleProject = async () => {
    await getSingleProject(routeParams.id);
  };

  const formatString = (input) => {
    if (!input || (input && input === "")) {
      return;
    }
    const cleanedString = input.replace("-", " ");
    const capitalizedString =
      cleanedString.charAt(0).toUpperCase() + cleanedString.slice(1);
    return capitalizedString;
  };

  const handleCurrencyInputChange = (e, name) => {
    const obj = {
      target: { name: name, value: e },
    };
    handleInputChange(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposalObj({
      ...propodalObj,
      [name]: value,
    });
  };

  const onSubmitForm = async () => {
    const result = await submitProposal(propodalObj, routeParams.id);
    if (result) {
      router.push("/manage-projects");
    }
  };

  return (
    <>
      <StickyContainer>
        <section className="pt30">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <div className="column">
                  <div className="scrollbalance-inner">
                    <div className="row">
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-notification-1" />
                          </div>
                          <div className="details">
                            <h5 className="title">Seller Type</h5>
                            <p className="mb-0 text">
                              {formatString(project.freelancerType)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-dollar" />
                          </div>
                          <div className="details">
                            <h5 className="title">Project type</h5>
                            <p className="mb-0 text">
                              {project.projectDurationType?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-fifteen" />
                          </div>
                          <div className="details">
                            <h5 className="title">Project Duration</h5>
                            <p className="mb-0 text">
                              {project.projectDuration}{" "}
                              {project.projectDurationType}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-like-1" />
                          </div>
                          <div className="details">
                            <h5 className="title">Project Level</h5>
                            <p className="mb-0 text">
                              {formatString(project.level)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-translator" />
                          </div>
                          <div className="details">
                            <h5 className="title">Category</h5>
                            <p className="mb-0 text">
                              {getService(project.projectCategory)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-about">
                      <h4>Description</h4>
                      <p className="text mb30">{project.description}</p>
                      <hr className="opacity-100 mb60 mt60" />
                      <h4 className="mb30">Attachments</h4>
                      <div className="row">
                        {project.projectAttachments?.map(
                          (attachment, index) => (
                            <div
                              className="col-6 col-lg-3 cursor-pointer"
                              key={index}
                              data-bs-toggle="modal"
                              data-bs-target="#fileViewerModal"
                              onClick={() => setFile(attachment)}
                            >
                              <div className="project-attach">
                                <h6 className="title">
                                  {getfileName(attachment.originalFileName)}
                                </h6>
                                <p>
                                  {getfileType(
                                    attachment.originalFileName,
                                    "type"
                                  )}
                                </p>
                                <span className="icon flaticon-page" />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <hr className="opacity-100 mb60 mt30" />
                      <h4 className="mb30">Skills Required</h4>
                      <div className="mb60">
                        {project?.projectSkills &&
                          project.projectSkills.map((item, i) => (
                            <a
                              key={i}
                              className={`tag list-inline-item mb-2 mb-xl-0 ${
                                Number(item.length) === 7 ? "mr0" : "mr10"
                              }`}
                            >
                              {getSkill(item.name)}
                            </a>
                          ))}
                      </div>
                      <hr className="opacity-100 mb60" />
                      {/* <h4 className="mb30">Project Proposals (3)</h4>
                      <div className="row">
                        {projectProposal1.slice(0, 3).map((item, i) => (
                          <div key={i} className="col-md-6 col-lg-12">
                            <ProjectProposalCard1 data={item} />
                          </div>
                        ))}
                      </div> */}
                      <div className="bsp_reveiw_wrt mt25">
                        <h4>Send Your Proposal</h4>
                        <form className="comments_form mt30 mb30-md">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb20">
                                <label className="heading-color ff-heading fw500 mb10">
                                  Your hourly price
                                </label>
                                <CurrencyInput
                                  className="form-control"
                                  prefix="$"
                                  placeholder="Please enter a number"
                                  name="hourlyRate"
                                  value={propodalObj.hourlyRate}
                                  onValueChange={handleCurrencyInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb20">
                                <label className="fw500 ff-heading dark-color mb-2">
                                  Estimated Hours
                                </label>
                                <CurrencyInput
                                  className="form-control"
                                  placeholder="Please enter a number"
                                  name="estimatedHours"
                                  value={propodalObj.estimatedHours}
                                  onValueChange={handleCurrencyInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-4">
                                <label className="fw500 fz16 ff-heading dark-color mb-2">
                                  Cover Letter
                                </label>
                                <textarea
                                  className="pt15"
                                  rows={6}
                                  name="coverLetter"
                                  value={propodalObj.coverLetter}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              {/* <ServiceDetailExtra1 /> */}
                            </div>
                            <div className="col-md-12">
                              <div className="d-grid">
                                <a
                                  className="ud-btn btn-thm"
                                  onClick={() => onSubmitForm()}
                                >
                                  Submit a Proposal
                                  <i className="fal fa-arrow-right-long" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="column">
                  {isMatchedScreen ? (
                    <Sticky>
                      {({ style }) => (
                        <div className="scrollbalance-inner" style={style}>
                          <div className="blog-sidebar ms-lg-auto">
                            <ProjectPriceWidget1 cost={project.cost} />
                            <ProjectContactWidget1
                              clientData={project.client ?? {}}
                            />
                          </div>
                        </div>
                      )}
                    </Sticky>
                  ) : (
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ProjectPriceWidget1 />
                        <ProjectContactWidget1
                          clientData={project.client ?? {}}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <FileViewer file={file} />
        </section>
      </StickyContainer>
    </>
  );
}
