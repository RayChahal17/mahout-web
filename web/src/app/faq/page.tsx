import type { Metadata } from "next";
import { FaqPageContent } from "@/components/FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ | Mahout",
  description:
    "Answers about Mahout, North Star, Path, trust, memory, Free vs Pro, North Star Credits, privacy, and Android launch.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
