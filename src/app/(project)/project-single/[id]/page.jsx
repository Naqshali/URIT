import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb11 from "@/components/breadcumb/Breadcumb11";

import ProjectDetail1 from "@/components/section/ProjectDetail1";
import TabSection1 from "@/components/section/TabSection1";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      {/* <Header3 /> */}
      <TabSection1 />
      <Breadcumb10 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb11 />
      <ProjectDetail1 />
    </>
  );
}
