"use client";

import projectsStore from "@/store/myprofile/projects";
import { useEffect, useMemo, useState } from "react";

export default function Pagination1({ totalCount, onSelectPage }) {
  const { size } = projectsStore();
  const [selectedPage, setSelectedPage] = useState(0);

  const totalPages = useMemo(() => {
    return Math.ceil((totalCount ?? 1) / size);
  });

  const onSelectNewPage = (pageNo) => {
    setSelectedPage(pageNo);
    onSelectPage(pageNo);
  };

  return (
    <>
      <div className={"mbp_pagination text-center"}>
        <ul className="page_navigation">
          <li
            className={`page-item ${totalPages <= 1 ? "disabled" : ""}`}
            aria-disabled="true"
          >
            <a className="page-link">
              <span className="fas fa-angle-left" />
            </a>
          </li>
          {Array(totalPages)
            .fill(totalPages)
            .map((_, index) => (
              <li
                className={`page-item ${
                  index === selectedPage ? "active" : ""
                }`}
                key={index}
                onClick={() => onSelectNewPage(index)}
              >
                <a className="page-link">{index + 1}</a>
              </li>
            ))}

          <li className={`page-item ${totalPages <= 1 ? "disabled" : ""}`}>
            <a className="page-link">
              <span className="fas fa-angle-right" />
            </a>
          </li>
        </ul>
        <p className="mt10 mb-0 pagination_page_count text-center">
          1 – 20 of 300+ property available
        </p>
      </div>
    </>
  );
}
