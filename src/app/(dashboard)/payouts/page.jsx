import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PayoutInfo from "@/components/dashboard/section/PayoutInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";
export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <PayoutInfo />
      </DashboardLayout>
    </>
  );
}
