import Breadcumb2 from "@/components/breadcumb/Breadcumb2";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import BlogArea2 from "@/components/section/BlogArea2";

export const metadata = {
  title: "URIT - Freelance Marketplace React/Next Js Template | Blog 2",
};

export default function page() {
  return (
    <>
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <Breadcumb2
        title="URIT Blog"
        brief="Give your visitor a smooth online experience with a solid UX design"
      />
      <BlogArea2 />
    </>
  );
}
