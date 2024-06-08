import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageServiceInfo from "@/components/dashboard/section/ManageServiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ManageServiceInfo />
      </DashboardLayout>
    </>
  );
}
