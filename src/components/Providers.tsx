"use client";

import SmoothScroll from "./SmoothScroll";
import TimeProvider from "./TimeProvider";
import InkCursor from "./InkCursor";
import Masthead from "./Masthead";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TimeProvider>
      <SmoothScroll>
        <div className="paper-tex">
          <Masthead />
          <InkCursor />
          {children}
        </div>
      </SmoothScroll>
    </TimeProvider>
  );
}
