import type { Metadata } from "next";
import NotebooksIndex from "@/components/pages/NotebooksIndex";
import { getFolios } from "@/lib/notebooks";

export const metadata: Metadata = {
  title: "The Notebooks",
  description: "Writing on agents, product and craft by Imtiaz Ahmed.",
};

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const folios = getFolios().map(({ html, ...f }) => f);
  return <NotebooksIndex folios={folios} />;
}
