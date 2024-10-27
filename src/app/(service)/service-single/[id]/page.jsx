"use client";

import { useEffect, useState } from "react";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb8 from "@/components/breadcumb/Breadcumb8";

import Header3 from "@/components/header/Header3";
import ServiceDetail1 from "@/components/section/ServiceDetail1";
import TabSection1 from "@/components/section/TabSection1";
import servicesStore from "@/store/myprofile/services";

import { useParams } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";

export default function Page() {
  const { getServiceById } = servicesStore();
  const [service, setservice] = useState({});
  const routeParams = useParams();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoader(true);
    const result = await getServiceById(routeParams.id);
    setLoader(false);
    if (result) {
      setservice(result);
    }
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
      {/* <TabSection1 /> */}
      {/* <Breadcumb3 path={["Home", "Services", "Design & Creative"]} /> */}
      <Breadcumb8 service={service ? service : {}} />
      <ServiceDetail1 service={service ? service : {}} />
    </>
  );
}
