import globalMixin from "@/mixins/global";
import { useState } from "react";
import FileViewer from "./fileViewerModal";

export default function ViewProjectModal({ project }) {
  const {
    getSkill,
    getService,
    getFreelancerType,
    getPriceType,
    getLanguage,
    getLanguageLevel,
    getLevel,
    getfileName,
    getfileType,
  } = globalMixin();

  const [file, setFile] = useState(null);

  return (
    <>
      <div
        className="modal fade"
        id="viewProjectModal"
        tabIndex={-1}
        aria-labelledby="viewProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content position-relative">
            <div className="modal-header sticky-header">
              <h5 className="modal-title">View Project</h5>
              <button
                type="button"
                className="btn-close position-absolute"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{
                  top: "25px",
                  right: "25px",
                  zIndex: "9",
                  fontSize: "16px",
                }}
                onClick={() => onCloseProjectModal()}
              />
            </div>
            <div className="modal-body p-4">
              <div className="container my-5">
                <h2 className="mb-4">Project Details</h2>
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Title:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{project?.title}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Project Category:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{getService(project?.projectCategory)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Freelancer Type:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>
                          {getFreelancerType(project?.freelancerType)}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Price Type:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{getPriceType(project?.priceType)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Cost:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{project?.cost}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Description:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{project?.description}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Project Duration:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{project?.projectDuration}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Level:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{getLevel(project?.level)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Language:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{getLanguage(project?.language)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Language Level:</strong>
                      </div>
                      <div className="col-md-8">
                        <span>{getLanguageLevel(project?.languageLevel)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Project Skills:</strong>
                      </div>
                      <div className="col-md-8">
                        <ul className="list-unstyled">
                          {project?.projectSkills.map((skill, index) => (
                            <span key={index}>
                              <li>{getSkill(skill.name)}</li>
                            </span>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="row">
                      {project?.projectAttachments?.map((attachment, index) => (
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
                              {getfileType(attachment.originalFileName, "type")}
                            </p>
                            <span className="icon flaticon-page" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer sticky-footer">
              <button
                type="button"
                className="ud-btn btn-thm close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onCloseModal()}
              >
                Close
                <i className="fal fa-arrow-right-long" />
              </button>
              <div className="text-start"></div>
            </div>
          </div>
        </div>
      </div>
      <FileViewer file={file} />
    </>
  );
}
