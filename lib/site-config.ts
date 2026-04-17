export const siteConfig = {
  name: "STACKWERKHAUS",
  title: "STACKWERKHAUS – Hier wird nicht nur dekoriert, sondern gebaut.",
  description:
    "Wir bauen digitale Auftritte, bei denen Fassade, Grundriss und Technik zusammenpassen für Unternehmen die hoch hinaus wollen.",
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
      href: "https://www.linkedin.com/in/Arthur-arthur-marshall",
    },
  ],
  navigation: [
    { label: "Projekte", href: "/#projekte" },
    { label: "Leistungen", href: "/#leistungen" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
} as const;
