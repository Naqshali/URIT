import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb17 from "@/components/breadcumb/Breadcumb17";

import FreelancerDetail1 from "@/components/section/FreelancerDetail1";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <TabSection1 />
      <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb17 />
      <FreelancerDetail1 />
    </>
  );
}
