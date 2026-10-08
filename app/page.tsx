import { Hero } from "@/components/Hero/Hero";
import { JourneyReel } from "@/components/Hero/JourneyReel";
import { TrustStrip } from "@/components/TrustStrip/TrustStrip";
import { WhoWeAre } from "@/components/WhoWeAre/WhoWeAre";
import { WorkbenchScatter } from "@/components/Workbench/WorkbenchScatter";
import { PhotoJourney } from "@/components/PhotoJourney/PhotoJourney";
import { SchoolJourney } from "@/components/SchoolJourney/SchoolJourney";
import { ProjectShowcase } from "@/components/ProjectShowcase/ProjectShowcase";
import { Statistics } from "@/components/Statistics/Statistics";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { SectionWave } from "@/components/ui/SectionWave";
import { site } from "@/data/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.fullName,
  description: site.description,
  url: site.url,
  address: site.offices.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.line1,
    addressLocality: office.city,
    addressRegion: office.state,
    postalCode: office.postalCode,
    addressCountry: "IN",
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <JourneyReel />
      <Hero />
      <SectionWave from="navy" to="white" />
      <TrustStrip />
      <WhoWeAre />
      <SectionWave from="white" to="ink" />
      <WorkbenchScatter />
      <SectionWave from="ink" to="navy" />
      <PhotoJourney />
      <SchoolJourney />
      <SectionWave from="navy" to="paper-2" />
      <ProjectShowcase />
      <SectionWave from="paper-2" to="ink" />
      <Statistics />
      <SectionWave from="ink" to="white" />
      <Testimonials />
      <SectionWave from="white" to="navy" />
      <FinalCTA />
    </>
  );
}
