import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopMakis from "./components/TopMakis";
import Combos from "./components/Combos";
import Differentials from "./components/Differentials";
import DeliveryInfo from "./components/DeliveryInfo";
import Reviews from "./components/Reviews";
import StickyCTA from "./components/StickyCTA";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TopMakis />
        <Combos />
        <Differentials />
        <DeliveryInfo />
        <Reviews />
      </main>
      <StickyCTA />
    </>
  );
}
