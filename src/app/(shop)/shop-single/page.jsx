import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import ShopSingleArea1 from "@/components/section/ShopSingleArea1";

export const metadata = {
  title: "URIT - Freelance Marketplace React/Next Js Template | Shop Single",
};

export default function page() {
  return (
    <>
      <Breadcumb3 path={["Home", "Services", "Design & Creative"]} />
      <ShopSingleArea1 />
    </>
  );
}
