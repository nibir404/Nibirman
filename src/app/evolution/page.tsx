import type { Metadata } from "next";
import Evolution from "@/components/pages/Evolution";

export const metadata: Metadata = {
  title: "Evolution — five acts",
  description: "From apprentice to maker of automatons: Imtiaz Ahmed's career, painted in five acts.",
};

export default function Page() {
  return <Evolution />;
}
