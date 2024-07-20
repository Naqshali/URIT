"use client";
import Header1 from "@/components/header/Header1";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import { usePathname } from "next/navigation";
import Header3 from "@/components/header/Header3";
import { header1, header3, sidebarEnable } from "@/data/header";

import toggleStore from "@/store/toggleStore";
import signUpStore from "@/store/signUp";
import { footer } from "@/data/footer";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import NavSidebar from "@/components/sidebar/NavSidebar";
import globalStore from "@/store/global";
import { useRouter } from "next/navigation";
import PusherInit from "@/components/pusher/pusher";

if (typeof window !== "undefined") {
  import("bootstrap");
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }) {
  const isListingActive = toggleStore((state) => state.isListingActive);
  const { loggedInUser, setUserLoggedInData } = signUpStore();
  const path = usePathname();
  const { getMetaData } = globalStore();
  const router = useRouter();

  useEffect(() => {
    onInitializeApp();
  }, []);

  useEffect(() => {
    if (loggedInUser === "session_expired") {
      localStorage.clear();
      setUserLoggedInData(null);
      router.push("/login");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      live: false,
    });
    wow.init();
  }, [path]);

  const onInitializeApp = () => {
    const info = JSON.parse(localStorage.getItem("loggedInUser"));
    if (info) {
      setUserLoggedInData(info);
    }
    getMetaData();
  };

  return (
    <html lang="en">
      <body
        className={`${dmSans.className} ${
          path === "/register" || path === "/login"
            ? "bgc-thm4 mm-wrapper mm-wrapper--position-left-front"
            : sidebarEnable.includes(path)
            ? isListingActive
              ? "menu-hidden-sidebar-content"
              : ""
            : ""
        }`}
      >
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        ></script>

        {!footer.includes(path) ? (
          <div className="wrapper ovh mm-page mm-slideout">
            {header1.find(
              (elm) => elm?.split("/")[1] == path?.split("/")[1]
            ) && <Header1 />}

            {header3.find(
              (elm) => elm?.split("/")[1] == path?.split("/")[1]
            ) && <Header3 />}

            <SearchModal1 />

            <div className="body_content">
              {children}
              <Footer />

              {/* bottom to top */}
              <BottomToTop />
            </div>
          </div>
        ) : (
          <div className="wrapper mm-page mm-slideout">
            {children}
            {/* bottom to top */}
            <BottomToTop />
          </div>
        )}

        {/* sidebar mobile navigation */}
        <PusherInit />
        <NavSidebar />
      </body>
    </html>
  );
}
