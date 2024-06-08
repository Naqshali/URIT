import Breadcumb16 from "@/components/breadcumb/Breadcumb16";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import Listing13 from "@/components/section/Listing13";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <TabSection1 />
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb16 />
      <Listing13 />
    </>
  );
}
