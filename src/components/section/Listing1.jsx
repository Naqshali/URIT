"use client";
import { product1 } from "@/data/product";
import ListingOption1 from "../element/ListingOption1";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import Pagination1 from "./Pagination1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import servicesStore from "@/store/myprofile/services";
import { useEffect, useState } from "react";
import globalMixin from "@/mixins/global";
import { InfinitySpin } from "react-loader-spinner";

export default function Listing1() {
  const { getAllListSize } = globalMixin();
  const { getServices } = servicesStore();
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState({
    services: [],
    totalCount: 0,
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("asdlkasd ");
    fetchServices();
  }, []);

  const fetchServices = async (pageNo, filter) => {
    const params = {
      pageNumber: pageNo ?? 0,
      pageSize: getAllListSize,
    };

    if (filter) {
      params.title = filter;
    }

    setLoader(true);
    const result = await getServices(params);
    setLoader(false);
    if (result) {
      setList(result);
    }
  };

  const onSelectPage = (pageNo) => {
    fetchServices(pageNo);
  };

  return (
    <>
      {loader && (
        <div className="loader-overlay">
          <InfinitySpin
            height={200}
            width={200}
            color="#00BFFF"
            ariaLabel="loading"
          />
        </div>
      )}
      <section className="pt30 pb90">
        <div className="container mb40">
          <div className="advance-search-field ">
            <div className="form-search position-relative search-service">
              <div className="box-search bb1-sm">
                <span className="icon far fa-magnifying-glass" />
                <input
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  name="search"
                  placeholder="Search Service"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      fetchServices(0, e.target.value);
                    }
                  }}
                />
              </div>
              <div className="text-center text-xl-start search-service">
                <button
                  className="ud-btn btn-thm w-100 search-service-btn"
                  type="button"
                  onClick={() => fetchServices(0, searchValue)}
                >
                  Search
                </button>
                <button
                  className="ud-btn btn-thm3 w-100 search-service-btn"
                  type="button"
                  onClick={() => {
                    fetchServices();
                    setSearchValue("");
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {/* <ListingOption1 /> */}
          <div className="row">
            {list?.services.map((item, i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                {/* {item?.gallery ? (
                  <PopularServiceSlideCard1 data={item} />
                ) : (
                )} */}
                <TrendingServiceCard1 data={item ? item : {}} />
              </div>
            ))}
          </div>
          <Pagination1
            totalCount={list.totalCount ?? 1}
            onSelectPage={onSelectPage}
          />
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
