import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb9 from "@/components/breadcumb/Breadcumb9";

import Listing8 from "@/components/section/Listing8";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      {/* <TabSection1 /> */}
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb9 />
      <Listing8 />
    </>
  );
}
