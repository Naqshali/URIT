"use client";

import projectsStore from "@/store/myprofile/projects";
import { useEffect, useMemo, useState } from "react";

export default function Pagination1({ totalCount, onSelectPage }) {
  const { size } = projectsStore();
  const [selectedPage, setSelectedPage] = useState(0);

  const totalPages = useMemo(() => {
    return Math.ceil((totalCount ?? 1) / size);
  }, [totalCount, size]);

  const currentlyShowingRecords = useMemo(() => {
    const records = (selectedPage + 1) * size;
    if (totalCount > records) {
      return records;
    }
    return totalCount;
  }, [selectedPage, size, totalCount]);

  const onSelectNewPage = (pageNo) => {
    if (pageNo >= 0 && pageNo < totalPages) {
      setSelectedPage(pageNo);
      onSelectPage(pageNo);
    }
  };

  const handlePrevious = () => {
    onSelectNewPage(selectedPage - 1);
  };

  const handleNext = () => {
    onSelectNewPage(selectedPage + 1);
  };

  return (
    <div className={"mbp_pagination text-center"}>
      <ul className="page_navigation">
        <li
          className={`page-item ${selectedPage === 0 ? "disabled" : ""}`}
          onClick={handlePrevious}
        >
          <a className="page-link">
            <span className="fas fa-angle-left" />
          </a>
        </li>
        {Array(totalPages)
          .fill(totalPages)
          .map((_, index) => (
            <li
              className={`page-item ${index === selectedPage ? "active" : ""}`}
              key={index}
              onClick={() => onSelectNewPage(index)}
            >
              <a className="page-link">{index + 1}</a>
            </li>
          ))}

        <li
          className={`page-item ${
            selectedPage === totalPages - 1 ? "disabled" : ""
          }`}
          onClick={handleNext}
        >
          <a className="page-link">
            <span className="fas fa-angle-right" />
          </a>
        </li>
      </ul>
      <p className="mt10 mb-0 pagination_page_count text-center">
        {selectedPage === 0 ? 1 : selectedPage * size + 1} –{" "}
        {currentlyShowingRecords} of {totalCount} records
      </p>
    </div>
  );
}