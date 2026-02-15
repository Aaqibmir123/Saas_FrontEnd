import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import ProductSection from "./components/ProductSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection title="Trending Products" />
      <WhyChooseUs />
    </>
  );
}
