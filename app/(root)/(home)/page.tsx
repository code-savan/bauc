import HeroSection from './components/HeroSection';
import CertificationSection from './components/CertificationSection';
import Services from './components/Services';
import WhyInvestSection from './components/WhyInvestSection';
import TeamCarousel from './components/TeamCarousel';
import CEOAddress from './components/CEOAddress';
import InvestmentJourney from './components/InvestmentJourney';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CertificationSection />
      <CEOAddress />
      <Services />
      <WhyInvestSection />
      <InvestmentJourney />
      <TeamCarousel />
    </main>
  );
}
