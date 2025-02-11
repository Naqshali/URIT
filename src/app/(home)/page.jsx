"use client";

import Hero1 from "@/components/hero/Hero1";
import About1 from "@/components/section/About1";
import BrowserCategory1 from "@/components/section/BrowserCategory1";
import CounterInfo1 from "@/components/section/CounterInfo1";
import CtaBanner1 from "@/components/section/CtaBanner1";
import NeedSomething1 from "@/components/section/NeedSomething1";
import OurBlog1 from "@/components/section/OurBlog1";
import OurCta1 from "@/components/section/OurCta1";
import OurPartner1 from "@/components/section/OurPartner1";
import Testimonial1 from "@/components/section/Testimonial1";
import TrendingService1 from "@/components/section/TrendingService1";

export default function page() {
  return (
    <>
      <Hero1 />
      <BrowserCategory1 />
      <NeedSomething1 />
      <CtaBanner1 />
      <About1 />
      <OurCta1 />
    </>
  );
}
