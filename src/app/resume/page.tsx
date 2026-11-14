import type { Metadata } from "next";
import Printer from "@/components/pages/Printer";

export const metadata: Metadata = {
  title: "Print my résumé",
  description: "Download Imtiaz Ahmed's résumé — printed layer by layer.",
};

export default function Page() {
  return <Printer />;
}
