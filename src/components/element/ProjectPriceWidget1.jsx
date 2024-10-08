import Link from "next/link";

export default function ProjectPriceWidget1({ cost }) {
  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">Total Budget</h3>
        <h3 className="widget-title">${cost}</h3>
        {/* <div className="d-grid">
          <Link href="/contact" className="ud-btn btn-thm">
            Submit a Proposal
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div> */}
      </div>
    </>
  );
}
