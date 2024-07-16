"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import signUpStore from "@/store/signUp";

export default function DashboardSidebar() {
  const path = usePathname();
  const { loggedInUser } = signUpStore();

  const showNavigationItem = (navItem) => {
    return (
      (loggedInUser?.userType === "CLIENT" &&
        (navItem.key === "create_project" ||
          navItem.key === "manage_project" ||
          navItem.key === "my_profile" ||
          navItem.key === "chats" ||
          navItem.key === "notifications")) ||
      (loggedInUser?.userType === "SERVICE_PROVIDER" &&
        (navItem.key === "add_services" ||
          navItem.key === "manage_service" ||
          navItem.key === "my_profile" ||
          navItem.key === "manage_project" ||
          navItem.key === "chats" ||
          navItem.key === "notifications")) ||
      !loggedInUser
    );
  };

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          <p className="fz15 fw400 ff-heading pl30">Start</p>
          {dasboardNavigation.slice(0, 8).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              {showNavigationItem(item) && (
                <Link
                  href={item.path}
                  className={`items-center ${
                    path === item.path ? "-is-active" : ""
                  }`}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* <p className="fz15 fw400 ff-heading pl30 mt30">Organize and Manage</p> */}

          {dasboardNavigation.slice(8, 13).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          {/* <p className="fz15 fw400 ff-heading pl30 mt30">Account</p> */}
          {dasboardNavigation.slice(13, 15).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              <Link href={item.path} className="items-center">
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
