"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import Award from "./Award";
import ChangePassword from "./ChangePassword";
import ConfirmPassword from "./ConfirmPassword";
import Education from "./Education";
import ProfileDetails from "./ProfileDetails";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";
import globalStore from "@/store/global";
import signUpStore from "@/store/signUp";

export default function MyProfileInfo() {
  const { meta } = globalStore();
  const { loggedInUser } = signUpStore();

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>My Profile</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <ProfileDetails meta={meta} />
            {loggedInUser?.userType === "SERVICE_PROVIDER" && (
              <div>
                <Skill meta={meta} />
                <Education meta={meta} />
                <WorkExperience />
                <Award />
              </div>
            )}
            {/* <ChangePassword /> */}
            {/* <ConfirmPassword /> */}
          </div>
        </div>
      </div>
    </>
  );
}
