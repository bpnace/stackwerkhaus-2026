export const siteConfig = {
  name: "STACKWERKHAUS",
  title: "STACKWERKHAUS | Webdesign und Frontend-Entwicklung aus Berlin",
  description:
    "Stackwerkhaus baut Websites, Web Apps und digitale Auftritte mit klarem Design, sauberer Technik und starker Nutzerführung für kleine Unternehmen.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://stackwerkhaus.de",
  email: "info@stackwerkhaus.de",
  location: "Berlin / Remote",
  founder: "Arthur Marshall",
  socialLinks: [
    {
      label: "Instagram",
      href: "https://instagram.com/stackwerkhaus",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tarik-arthur-marshall",
    },
  ],
  navigation: [
    { label: "Projekte", href: "/#projekte" },
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Pakete", href: "/#pricing" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
} as const;
