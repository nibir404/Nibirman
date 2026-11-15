import type { Metadata } from "next";
import { Resume } from "@/components/pages/People";

export const metadata: Metadata = { title: "Résumé", description: "Print-ready résumé of Imtiaz Ahmed, AI Product Architect." };
export default function Page() { return <Resume />; }
