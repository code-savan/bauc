'use client';

import HeroSection from './components/HeroSection';
import CertificationSection from './components/CertificationSection';
import Services from './components/Services';
import WhyInvestSection from './components/WhyInvestSection';
import TeamCarousel from './components/TeamCarousel';
import CEOAddress from './components/CEOAddress';
import InvestmentJourney from './components/InvestmentJourney';
import ValueProposition from './components/ValueProposition';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeInUp}>
          <ValueProposition />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <CertificationSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <CEOAddress />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Services />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <WhyInvestSection />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <InvestmentJourney />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <TeamCarousel />
        </motion.div>
      </motion.div>
    </main>
  );
}
