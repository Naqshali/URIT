"use client";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb17 from "@/components/breadcumb/Breadcumb17";

import Header3 from "@/components/header/Header3";
import FreelancerDetail1 from "@/components/section/FreelancerDetail1";
import TabSection1 from "@/components/section/TabSection1";
import providersStore from "@/store/providers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { getServiceProviderById } = providersStore();
  const { id } = useParams();
  const [provider, setProvider] = useState({});

  useEffect(() => {
    fetchProvider();
  }, []);

  const fetchProvider = async () => {
    const result = await getServiceProviderById(id);
    console.log("fetchProvider ~ result:", result);
    if (result) {
      setProvider(result);
    }
  };

  return (
    <>
      {/* <TabSection1 /> */}
      {/* <Breadcumb10 path={["Home", "Services", "Design & Creative"]} /> */}
      <Breadcumb17 provider={provider ? provider : {}} />
      <FreelancerDetail1 provider={provider ? provider : {}} />
    </>
  );
}
