import type { Metadata } from "next";
import { About } from "@/components/pages/People";

export const metadata: Metadata = { title: "About Imtiaz Ahmed — AI Product Architect", description: "Learn about Imtiaz Ahmed, his work across AI, product strategy, UX research, design, and technology." };
export default function Page() { return <About />; }
