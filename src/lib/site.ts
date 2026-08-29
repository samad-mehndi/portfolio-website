// The production domain isn't decided yet (site isn't deployed). Set
// NEXT_PUBLIC_SITE_URL at deploy time; this falls back to localhost so
// robots.ts/sitemap.ts/metadataBase still resolve to *something* valid
// during local builds.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
