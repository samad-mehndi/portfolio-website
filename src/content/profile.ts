import type { Profile } from "./types";

export const profile: Profile = {
  name: "Samad Mehndi",
  location: "Dallas, TX",
  role: "Software Engineer",
  availability: "Open to roles anywhere in the US",
  headline: [
    { segments: [{ text: "I build products" }] },
    // The em-dash here is the one deliberate exception in CLAUDE.md's
    // copy rules. Preserve it exactly, do not normalise it away.
    { segments: [{ text: "end to end—" }] },
    {
      small: true,
      segments: [
        { text: "from " },
        { text: "interface to intelligence.", accent: true },
      ],
    },
  ],
  lead: "I am Samad, a software engineer based in Dallas and open to roles anywhere in the US. Close to three years shipping production APIs, an MS in computer engineering with a machine learning focus, and a habit of taking projects the whole way: the interface, the service behind it, the data it runs on, and the model when there is one.",
  stats: [
    { value: "3 yrs", label: "Production" },
    { value: "MS CE", label: "ML focus" },
    { value: "7", label: "Shipped projects" },
    { value: "Full stack", label: "End to end" },
  ],
  email: "samadxmehndi@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/samad-mehndi" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/samad-mehndi" },
  ],
  resumePath: "/resume-swe.pdf",
  relocationNote: "open to relocation",
  copyrightNote: "All rights reserved.",
};

// Copy for the Contact section's own heading block, ported verbatim from
// v0.html. Lives here, not on `profile`, since it's specific to that one
// section rather than being a reusable fact about the person.
export const contactSection = {
  eyebrow: "Open to work",
  heading: "Let's build something good",
  lead: "I am looking for software engineering roles across full stack, machine learning, and data, anywhere in the US. I am based in Dallas and happy to relocate or work remotely. If you need someone who can own a feature from the interface down to the model, I would like to hear about it.",
};
