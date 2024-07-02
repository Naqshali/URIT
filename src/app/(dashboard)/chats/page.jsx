import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Chats from "@/components/dashboard/section/Chats";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <Chats />
      </DashboardLayout>
    </>
  );
}
