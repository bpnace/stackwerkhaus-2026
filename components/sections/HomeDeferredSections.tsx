import type { BlogPost } from "@/lib/blog";
import type { Project } from "@/lib/projects";
import { BlogSection } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FAQ } from "@/components/sections/FAQ";
import { Pricing } from "@/components/sections/Pricing";
import { Profile } from "@/components/sections/Profile";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Ticker } from "@/components/sections/Ticker";

type HomeDeferredSectionsProps = {
  posts: BlogPost[];
  projects: Project[];
};

export function HomeDeferredSections({
  posts,
  projects,
}: HomeDeferredSectionsProps) {
  return (
    <>
      <div
        className="mobile-deferred-section"
        data-mobile-deferred-size="compact"
      >
        <Ticker />
      </div>
      <div
        className="mobile-deferred-section"
        data-mobile-deferred-size="large"
      >
        <Projects projects={projects} />
      </div>
      <div
        className="mobile-deferred-section"
        data-mobile-deferred-size="large"
      >
        <Services />
      </div>
      <div
        className="mobile-deferred-section"
        data-mobile-deferred-size="large"
      >
        <Profile />
      </div>
      <div className="mobile-deferred-section">
        <Experience />
      </div>
      <div
        className="mobile-deferred-section"
        data-mobile-deferred-size="large"
      >
        <Testimonials />
      </div>
      <div className="mobile-deferred-section">
        <Contact />
      </div>
      <div className="mobile-deferred-section">
        <Pricing />
      </div>
      <div className="mobile-deferred-section">
        <BlogSection posts={posts} />
      </div>
      <div className="mobile-deferred-section">
        <FAQ />
      </div>
    </>
  );
}
