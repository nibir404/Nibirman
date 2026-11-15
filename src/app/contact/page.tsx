import type { Metadata } from "next";
import { Contact } from "@/components/pages/People";

export const metadata: Metadata = { title: "Let's Talk", description: "Connect with Imtiaz Ahmed about AI products, product strategy, digital transformation, and strategic collaborations." };
export default function Page() { return <Contact />; }
