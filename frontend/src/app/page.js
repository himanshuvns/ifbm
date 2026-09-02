import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import WhyIndianFootball from '@/components/WhyIndianFootball/WhyIndianFootball';
import Vision from '@/components/Vision/Vision';
import TacticsPitch from '@/components/TacticsPitch/TacticsPitch';
import JoinMovement from '@/components/JoinMovement/JoinMovement';
import LatestCampaign from '@/components/LatestCampaign/LatestCampaign';
import TakeAction from '@/components/TakeAction/TakeAction';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhyIndianFootball />
        <Vision />
        <TacticsPitch />
        <JoinMovement />
        <LatestCampaign />
        <TakeAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
