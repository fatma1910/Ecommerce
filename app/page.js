import Image from "next/image";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";

export default function Home() {
  return (
    <div>
      <Hero/>
      <ProductSection />
    </div>
  );
}
