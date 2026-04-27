import { ViewTransition } from "react";
import { BlogSection } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Profile } from "@/components/sections/Profile";
import { Projects } from "@/components/sections/Projects";
import { PinnedIntroShell } from "@/components/sections/PinnedIntroShell";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Ticker } from "@/components/sections/Ticker";
import { getLatestPosts } from "@/lib/blog";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(6),
    getLatestPosts(4),
  ]);

  return (
    <main>
      <ViewTransition
        enter={{
          "nav-forward": "nav-forward",
          "nav-back": "nav-back",
          default: "none",
        }}
        exit={{
          "nav-forward": "nav-forward",
          "nav-back": "nav-back",
          default: "none",
        }}
        default="none"
      >
        <PinnedIntroShell hero={<Hero />}>
          <Ticker />
          <Projects projects={projects} />
          <Services />
          <Profile />
          <Experience />
          <Testimonials />
          <Contact />
          <Pricing />
          <BlogSection posts={posts} />
          <FAQ />
        </PinnedIntroShell>
      </ViewTransition>
    </main>
  );
}
