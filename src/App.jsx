import './index.css';
import { useLenisScroll, useActiveSection } from './hooks';
import { Navigation } from './components/Navigation';
import { Cursor } from './components/Cursor';
import { Marquee } from './components/Marquee';
import { HeroSection } from './sections/Hero';
import { StorySection } from './sections/Story';
import { JourneySection } from './sections/Journey';
import { WorkSection } from './sections/Work';
import { SystemsSection } from './sections/Systems';
import { SkillsSection } from './sections/Skills';
import { AchievementsSection } from './sections/Achievements';
import { BeyondSection, NowFutureSection } from './sections/BeyondCode';
import { ContactSection, Footer } from './sections/Contact';

const SECTION_IDS = ['hero', 'story', 'journey', 'work', 'systems', 'skills', 'achievements', 'beyond', 'now', 'contact'];

function App() {
  useLenisScroll();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Cursor />
      <Navigation activeSection={activeSection} />

      <main id="main-content">
        <HeroSection />
        <Marquee />
        <StorySection />
        <JourneySection />
        <WorkSection />
        <SystemsSection />
        <SkillsSection />
        <AchievementsSection />
        <BeyondSection />
        <NowFutureSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
