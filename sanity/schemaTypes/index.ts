import { project } from "./project";
import { about } from "./about";
import { experience } from "./experience";
import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";

// Section object types (used inside pageBuilder)
import { heroSection } from "./sections/heroSection";
import { projectsGridSection } from "./sections/projectsGridSection";
import { aboutSection } from "./sections/aboutSection";
import { experienceSection } from "./sections/experienceSection";
import { softwareMarqueeSection } from "./sections/softwareMarqueeSection";
import { pricingSection } from "./sections/pricingSection";
import { faqSection } from "./sections/faqSection";
import { contactSection } from "./sections/contactSection";

export const schemaTypes = [
  // Documents
  homepage,
  project,
  about,
  experience,
  siteSettings,
  // Section objects (registered globally so pageBuilder can reference them)
  heroSection,
  projectsGridSection,
  aboutSection,
  experienceSection,
  softwareMarqueeSection,
  pricingSection,
  faqSection,
  contactSection,
];
