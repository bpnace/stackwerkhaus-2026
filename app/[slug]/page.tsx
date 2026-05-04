import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-pages/LandingPage";
import {
  getLandingPage,
  getLandingPageMetadata,
} from "@/lib/landing-pages";
import { verticalLandingPages } from "@/lib/vertical-landing-pages";

type DynamicLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return verticalLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: DynamicLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = verticalLandingPages.find((entry) => entry.slug === slug);

  if (!page) {
    return {
      title: "Nicht gefunden",
    };
  }

  return getLandingPageMetadata(page);
}

export default async function DynamicLandingPage({
  params,
}: DynamicLandingPageProps) {
  const { slug } = await params;
  const page = verticalLandingPages.find((entry) => entry.slug === slug);

  if (!page) {
    notFound();
  }

  return <LandingPage page={getLandingPage(page.slug)} />;
}
