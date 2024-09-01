"use client";
import Image from "next/image";
import globalMixin from "@/mixins/global";
import { dateInStringFormat } from "@/utils/global";

export default function Breadcumb17({ provider }) {
  const { getCountry, getSkill } = globalMixin();

  const skills = () => {
    return provider.userSkills?.map((item) => getSkill(item.name)).join(", ");
  };
  return (
    <>
      <section className="breadcumb-section">
        <div className="cta-service-v1 freelancer-single-style mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
          <Image
            height={226}
            width={198}
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="vector-img"
          />
          <Image
            height={181}
            width={255}
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="vector-img"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="position-relative">
                  <h2>{provider.tagLine}</h2>
                  <div className="list-meta d-sm-flex align-items-center mt30">
                    <a className="position-relative freelancer-single-style">
                      <span className="online" />
                      <Image
                        height={90}
                        width={90}
                        className="rounded-circle w-100 wa-sm mb15-sm"
                        src="/images/team/fl-1.png"
                        alt="Freelancer Photo"
                      />
                    </a>
                    <div className="ml20 ml0-xs">
                      <h5 className="title mb-1">{provider.name}</h5>
                      <p className="mb-0">{skills()}</p>
                      <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                        {/* <i className="fas fa-star vam fz10 review-color me-2" />{" "}
                        4.82 94 reviews */}
                        <i className="fas fa-envelope vam fz20 me-2" />
                        {provider.email}
                      </p>
                      <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                        <i className="flaticon-place vam fz20 me-2" />{" "}
                        {getCountry(provider.country)}, {provider.city}
                      </p>
                      <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                        <i className="flaticon-30-days vam fz20 me-2" /> Member
                        since {dateInStringFormat(provider.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
