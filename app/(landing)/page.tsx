import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import SocialProof from "@/components/landing/SocialProof";
import MockupGrid from "@/components/landing/MockupGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import ComparisonTable from "@/components/landing/ComparisonTable";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <SocialProof />
      <MockupGrid />
      <HowItWorks />
      <UseCases />
      <ComparisonTable />
      <FAQ />
      <FinalCTA />
    </>
  );
}
