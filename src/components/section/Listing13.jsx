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

export default function Listing13() {
  const { getServiceProviders } = providersStore();
  const { getAllListSize } = globalMixin();
  const [providersList, setProvidersList] = useState({
    serviceProviders: [],
    totalCount: 0,
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const params = {
      pageNumber: 0,
      PageSize: getAllListSize,
    };
    const result = await getServiceProviders(params);
    if (result) {
      setProvidersList(result);
    }
  };

  const onSelectPage = (pageNo) => {
    fetchProviders(pageNo);
  };

  return (
    <>
      <section className="pt30 pb90">
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
