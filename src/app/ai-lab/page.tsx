import type { Metadata } from "next";
import { AILab } from "@/components/pages/Disciplines";

export const metadata: Metadata = { title: "AI Experiments & Intelligent Systems", description: "Discover explorations in agentic AI, multi-agent systems, AI-native interfaces, and human-AI interaction." };
export default function Page() { return <AILab />; }
