import BackgroundOrbs from "@/components/BackgroundOrbs";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import NetworksSection from "@/components/NetworksSection";
import Footer from "@/components/Footer";
import WalletBox from "@/components/WalletBox";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <BackgroundOrbs />

      <WalletBox />

      <div className="relative z-10">
        <Header />
        <Hero />
        <FeaturesSection />
        <NetworksSection />
        <Footer />
      </div>
    </main>
  );
}
