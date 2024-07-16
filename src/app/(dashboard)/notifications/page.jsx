import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Notifications from "@/components/dashboard/section/Notifications";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <Notifications />
      </DashboardLayout>
    </>
  );
}
