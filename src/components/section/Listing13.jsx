"use client";
import listingStore from "@/store/listingStore";
import FreelancerCard1 from "../card/FreelancerCard1";
import ListingOption6 from "../element/ListingOption6";
import Pagination1 from "./Pagination1";
import { freelancer1 } from "@/data/product";
import priceStore from "@/store/priceStore";
import ListingSidebarModal5 from "../modal/ListingSidebarModal5";
import providersStore from "@/store/providers";
import { useEffect, useState } from "react";
import globalMixin from "@/mixins/global";
import { InfinitySpin } from "react-loader-spinner";

export default function Listing13() {
  const { getServiceProviders } = providersStore();
  const { getAllListSize } = globalMixin();
  const [providersList, setProvidersList] = useState({
    serviceProviders: [],
    totalCount: 0,
  });

  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async (pageNo, filter) => {
    const params = {
      pageNumber: pageNo ?? 0,
      PageSize: getAllListSize,
    };

    if (filter) {
      params.name = filter;
    }

    setLoader(true);
    const result = await getServiceProviders(params);
    setLoader(false);
    if (result) {
      setProvidersList(result);
    }
  };

  const onSelectPage = (pageNo) => {
    fetchProviders(pageNo);
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
                  placeholder="Search Freelancer"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      fetchProviders(0, e.target.value);
                    }
                  }}
                />
              </div>
              <div className="text-center text-xl-start search-service">
                <button
                  className="ud-btn btn-thm w-100 search-service-btn"
                  type="button"
                  onClick={() => fetchProviders(0, searchValue)}
                >
                  Search
                </button>
                <button
                  className="ud-btn btn-thm3 w-100 search-service-btn"
                  type="button"
                  onClick={() => {
                    fetchProviders();
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
          {/* <ListingOption6 /> */}
          <div className="row">
            {providersList.serviceProviders.map((item, i) => (
              <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                <FreelancerCard1 data={item} />
              </div>
            ))}
          </div>
          <div className="row mt30">
            <Pagination1
              totalCount={providersList.totalCount ?? 1}
              onSelectPage={onSelectPage}
            />
          </div>
        </div>
      </section>
      <ListingSidebarModal5 />
    </>
  );
}
