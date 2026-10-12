import MatchdayHero from "@/components/hero/MatchdayHero";
import PlayerProfile from "@/components/sections/PlayerProfile";
import MatchHistory from "@/components/sections/MatchHistory";
import StartingXI from "@/components/sections/StartingXI";
import TransferHistory from "@/components/sections/TransferHistory";
import Academy from "@/components/sections/Academy";
import TrophyRoom from "@/components/sections/TrophyRoom";
import CurrentForm from "@/components/sections/CurrentForm";
import ScoutingReport from "@/components/sections/ScoutingReport";
import NextFixture from "@/components/sections/NextFixture";
import FinalWhistle from "@/components/sections/FinalWhistle";
import Footer from "@/components/layout/Footer";
import MatchDivider from "@/components/ui/MatchDivider";

// The matchday, in order: kick-off to final whistle.
export default function Home() {
  return (
    <>
      <MatchdayHero />
      <PlayerProfile />
      <MatchHistory />
      <MatchDivider minute="45'" label="HALF TIME" />
      <StartingXI />
      <TransferHistory />
      <Academy />
      <TrophyRoom />
      <CurrentForm />
      <ScoutingReport />
      <NextFixture />
      <FinalWhistle />
      <Footer />
    </>
  );
}
