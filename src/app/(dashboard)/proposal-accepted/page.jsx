import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProposalAccepted from "@/components/dashboard/section/ProposalAccepted";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "URIT",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ProposalAccepted />
      </DashboardLayout>
    </>
  );
}
