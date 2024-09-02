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

export default function Listing1() {
  const { getAllListSize } = globalMixin();
  const { getServices } = servicesStore();
  const [list, setList] = useState({
    services: [],
    totalCount: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async (pageNo) => {
    const params = {
      pageNumber: pageNo ?? 0,
      pageSize: getAllListSize,
    };
    const result = await getServices(params);
    if (result) {
      setList(result);
    }
  };

  const onSelectPage = (pageNo) => {
    fetchServices(pageNo);
  };

  return (
    <>
      <section className="pt30 pb90">
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
