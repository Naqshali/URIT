"use client";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb4 from "@/components/breadcumb/Breadcumb4";

import Listing1 from "@/components/section/Listing1";
import TabSection1 from "@/components/section/TabSection1";
import servicesStore from "@/store/myprofile/services";
import globalMixin from "@/mixins/global";
import { useEffect, useState } from "react";

export default function Page() {
  const [services, setServices] = useState({});
  const { getAllListSize } = globalMixin();

  return (
    <>
      {/* <TabSection1 /> */}
      {/* <Breadcumb3 path={["Home", "Services", "Design & Creative"]} /> */}
      <Breadcumb4 />
      <Listing1 />
    </>
  );
}
