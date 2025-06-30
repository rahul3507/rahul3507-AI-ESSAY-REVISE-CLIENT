import PricingCards from "./PricingCards";

const Upgrade = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
          Upgrade Your Plan
        </h1>
        <PricingCards />
      </div>
    </section>
  );
};

export default Upgrade;
