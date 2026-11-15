"use client";

import { MotionConfig } from "framer-motion";
import TimeProvider from "./TimeProvider";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TimeProvider>
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
        </SmoothScroll>
      </TimeProvider>
    </MotionConfig>
  );
}
