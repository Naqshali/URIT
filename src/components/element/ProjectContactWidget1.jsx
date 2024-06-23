import Image from "next/image";
import Link from "next/link";
import globalMixin from "@/mixins/global";

export default function ProjectContactWidget1({ clientData }) {
  const { getGender, getCountry, getLanguage } = globalMixin();
  return (
    <>
      <div className="freelancer-style1 service-single mb-0 bdrs8">
        <h4>About Project Owner</h4>
        <div className="wrapper d-flex align-items-center mt20">
          <div className="thumb position-relative mb25">
            <Image
              height={60}
              width={60}
              className="rounded-circle mx-auto"
              src="/images/team/client-1.png"
              alt="client"
            />
          </div>
          <div className="ml20">
            <h5 className="title mb-1">{clientData.name}</h5>
            <p className="mb-0">{getGender(clientData.gender)}</p>
            <div className="review">
              <p>{clientData.email}</p>
            </div>
          </div>
        </div>
        <hr className="opacity-100" />
        <div className="details">
          <div className="fl-meta d-flex align-items-center justify-content-between">
            <a className="meta fw500 text-start">
              Location
              <br />
              <span className="fz14 fw400">
                {getCountry(clientData.country)}
              </span>
            </a>
            <a className="meta fw500 text-start">
              Language
              <br />
              <span className="fz14 fw400">
                {getLanguage(clientData.language)}
              </span>
            </a>
            <a className="meta fw500 text-start">
              Number
              <br />
              <span className="fz14 fw400">{clientData.phoneNumber}</span>
            </a>
          </div>
        </div>
        <div className="d-grid mt30">
          <Link href="/contact" className="ud-btn btn-thm-border">
            Contact Buyer
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </>
  );
}
