import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TopMakis from "./components/TopMakis";
import DeliveryInfo from "./components/DeliveryInfo";
import Differentials from "./components/Differentials";
import Reviews from "./components/Reviews";


export default function App() {
  return (
    <>
      <Header />
      <main className="pageWithCartBar">
        <Hero />
        <TopMakis />
        <DeliveryInfo />
        <Differentials />
        <Reviews />
      </main>
      
    </>
  );
}
