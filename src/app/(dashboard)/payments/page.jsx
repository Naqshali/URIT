import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Payments from "@/components/dashboard/section/payments";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <Payments />
      </DashboardLayout>
    </>
  );
}
