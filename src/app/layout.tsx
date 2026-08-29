import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from "next/font/google";
import { profile } from "@/content/profile";
import { education } from "@/content/education";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Samad Mehndi · Software Engineer";
const description =
  "Software engineer working across full stack, machine learning, and data. Close to three years of production experience and an MS in computer engineering. Open to roles across the US.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// https://schema.org/Person
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  address: profile.location,
  alumniOf: education.map((degree) => ({
    "@type": "CollegeOrUniversity",
    name: degree.school,
  })),
  sameAs: profile.links.map((link) => link.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="ambient-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
