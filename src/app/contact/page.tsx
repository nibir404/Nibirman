import type { Metadata } from "next";
import Letter from "@/components/pages/Letter";

export const metadata: Metadata = {
  title: "Write me a letter",
  description: "Contact Imtiaz Ahmed, Agentic Product Manager in Dhaka.",
};

export default function Page() {
  return <Letter />;
}
