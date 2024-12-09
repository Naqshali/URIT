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
import Toastr from "@/components/toastr/toastr";
import Script from "next/script";

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
  const { getMetaData, globalToastr } = globalStore();
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = "/favicon.ico";
      document.head.appendChild(link);
    }, 5000); // Delay of 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Moyasar stylesheet */}
        <link
          rel="stylesheet"
          href="https://cdn.moyasar.com/mpf/1.14.0/moyasar.css"
        />

        <link rel="icon" href="/images/favicon.ico" />

        {/* Moyasar script */}
        <Script
          src="https://cdn.moyasar.com/mpf/1.14.0/moyasar.js"
          strategy="afterInteractive"
        />

        {/* Polyfill script */}
        <Script
          src="https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?version=4.8.0&features=fetch"
          strategy="beforeInteractive"
        />
      </head>
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
              {/* <Footer /> */}

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
        {globalToastr && (
          <Toastr showToastr={globalToastr} action={true}></Toastr>
        )}
      </body>
    </html>
  );
}
