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
import { footer } from "@/data/footer";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import NavSidebar from "@/components/sidebar/NavSidebar";

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
  const path = usePathname();

  // wow js
  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      live: false,
    });
    wow.init();
  }, [path]);

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
        <NavSidebar />
      </body>
    </html>
  );
}
