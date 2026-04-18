import PageHeader from '@/components/about/PageHeader';
import BioSection from '@/components/about/BioSection';
import PhilosophySection from '@/components/about/PhilosophySection';
import WorkApproach from '@/components/about/WorkApproach';
import ProfessionalTimeline from '@/components/about/ProfessionalTimeline';
import TechStack from '@/components/about/TechStack';
import CTASection from '@/components/about/CTASection';

export default function About() {
  return (
    <div>
      <PageHeader />
      <BioSection />
      <PhilosophySection />
      <WorkApproach />
      <ProfessionalTimeline />
      <TechStack />
      <CTASection />
    </div>
  );
}
