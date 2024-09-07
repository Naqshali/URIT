"use client";

import { product1 } from "@/data/product";
import FreelancerAbout1 from "../element/FreelancerAbout1";
import FreelancerSkill1 from "../element/FreelancerSkill1";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import FreelancerFutureCard1 from "../card/FreelancerFutureCard1";
import { dateInYearFormatOnly } from "@/utils/global";
import globalMixin from "@/mixins/global";
import servicesStore from "@/store/myprofile/services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FreelancerDetail1({ provider = {} }) {
  const { getDegree, getAllListSize } = globalMixin();
  const { getServices } = servicesStore();
  const { id } = useParams();

  const [providerServices, setProviderServices] = useState({
    services: [],
    totalCount: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (pageNo) => {
    const params = {
      userId: id,
      pageNumber: pageNo ?? 0,
      pageSize: getAllListSize,
    };
    const result = await getServices(params);
    if (result) {
      setProviderServices(result);
    }
  };

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              {/* <div className="row">
                <div className="col-sm-6 col-xl-3">
                  <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                    <div className="icon flex-shrink-0">
                      <span className="flaticon-target" />
                    </div>
                    <div className="details">
                      <h5 className="title">Job Success</h5>
                      <p className="mb-0 text">98%</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                    <div className="icon flex-shrink-0">
                      <span className="flaticon-goal" />
                    </div>
                    <div className="details">
                      <h5 className="title">Total Jobs</h5>
                      <p className="mb-0 text">921</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                    <div className="icon flex-shrink-0">
                      <span className="flaticon-fifteen" />
                    </div>
                    <div className="details">
                      <h5 className="title">Total Hours</h5>
                      <p className="mb-0 text">1,499</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                    <div className="icon flex-shrink-0">
                      <span className="flaticon-file-1" />
                    </div>
                    <div className="details">
                      <h5 className="title">In Queue Service</h5>
                      <p className="mb-0 text">20</p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="service-about">
                <h4>Description</h4>
                <p className="text mb30">{provider.description}</p>

                <hr className="opacity-100 mb60 mt60" />
                <h4 className="mb30">Education</h4>
                <div className="educational-quality">
                  {provider.educationList?.map((item, i) => (
                    <div key={i}>
                      <div className="m-circle text-thm">Y</div>
                      <div className="wrapper mb40">
                        <div>
                          <span className="tag">
                            {dateInYearFormatOnly(item.startYear)} -{" "}
                            {dateInYearFormatOnly(item.endYear)}
                          </span>
                          <h5 className="mt15">{getDegree(item.getDegree)}</h5>
                          <h6 className="text-thm">{item.institution}</h6>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="opacity-100 mb60" />
                <h4 className="mb30">Work &amp; Experience</h4>
                <div className="educational-quality">
                  {provider.workExperiences?.map((item, i) => (
                    <div key={i}>
                      <div className="m-circle text-thm">Y</div>
                      <div className="wrapper mb40">
                        <span className="tag">
                          {dateInYearFormatOnly(item.startYear)} -{" "}
                          {dateInYearFormatOnly(item.endYear)}
                        </span>
                        <h5 className="mt15">{item.designation}</h5>
                        <h6 className="text-thm">{item.company}</h6>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="opacity-100 mb60" />
                <h4 className="mb30">Awards & Certificates</h4>
                <div className="educational-quality">
                  {provider.awards?.map((item, i) => (
                    <div key={i}>
                      <div className="m-circle text-thm">Y</div>
                      <div className="wrapper mb40">
                        <span className="tag">
                          {dateInYearFormatOnly(item.issueDate)}
                        </span>
                        <h5 className="mt15">{item.title}</h5>
                        <h6 className="text-thm">{item.issuedBy}</h6>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <hr className="opacity-100 mb60" />
                <h4 className="mb30">Featured Services</h4>
                <div className="row mb35">
                  {providerServices.services.map((item, i) => (
                    <div className="col-sm-6 col-xl-4" key={i}>
                      <FreelancerFutureCard1 data={item} />
                    </div>
                  ))}
                </div>
                <hr className="opacity-100" />
                <ServiceDetailReviewInfo1 />
                <ServiceDetailComment1 /> */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-sidebar ms-lg-auto">
                <FreelancerAbout1 provider={provider} />
                <FreelancerSkill1 skills={provider.userSkills ?? []} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
