"use client";
import Link from "next/link";
import Mega from "./Mega";
import Image from "next/image";
import Navigation from "./Navigation";
import useStickyMenu from "@/hook/useStickyMenu";
import MobileNavigation1 from "./MobileNavigation1";
import signUpStore from "@/store/signUp";
import HeaderNotifications from "./Notifications";

export default function Header1() {
  const sticky = useStickyMenu(50);
  const { loggedInUser } = signUpStore();

  return (
    <>
      <header
        className={`header-nav nav-homepage-style stricky main-menu animated   ${
          sticky ? "slideInDown stricky-fixed" : "slideIn"
        }`}
      >
        <nav className="posr">
          <div className="container-fluid posr menu_bdrt1 px30">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto px-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos br-white-light pr30 pr5-xl">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        height={40}
                        width={133}
                        src="/images/header-logo.png"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        height={40}
                        width={133}
                        src="/images/header-logo2.png"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  <div className="home1_style">
                    <Mega />
                  </div>
                </div>
              </div>
              <div className="col-auto px-0">
                <div className="d-flex align-items-center">
                  <Navigation />
                  {loggedInUser && <HeaderNotifications />}
                  {!loggedInUser && (
                    <span className="display-flex-center">
                      <Link className={`login-info mr15-lg mr30`} href="/login">
                        Sign in
                      </Link>
                      <Link
                        className="ud-btn btn-white add-joining"
                        href="/register"
                      >
                        Join
                      </Link>
                    </span>
                  )}
                  {loggedInUser && (
                    <Link
                      className={`login-info mr15-lg mr30`}
                      href="/my-profile"
                    >
                      {loggedInUser.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation1 />
    </>
  );
}
