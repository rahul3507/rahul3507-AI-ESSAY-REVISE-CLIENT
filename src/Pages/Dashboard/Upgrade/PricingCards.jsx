import { useState } from "react";
import usePackagePlan from "../../../components/hook/usePackagePlan";
import apiClient from "../../../lib/api-client";

const PricingCards = () => {
  const { packageData, loading } = usePackagePlan();
  const [selected, setSelected] = useState(null);
  const [payingPlanId, setPayingPlanId] = useState(null); // 👈 updated

  const handleBuyNow = async (plan) => {
    try {
      setPayingPlanId(plan.id); // 👈 mark current plan as "processing"

      const response = await apiClient.post("/payment/create-checkout-session/", {
        price_id: plan.price_id,
        plan_name: plan.name,
        duration_type: plan.duration_type,
      });

      if (response.data?.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        alert("Payment initialization failed. Try again.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Something went wrong during payment.");
    } finally {
      setPayingPlanId(null); // 👈 reset after process
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 px-4 py-10 bg-gradient-to-br from-gray-100 to-white rounded-2xl">
      {packageData?.map((plan) => {
        const isActive = selected === plan.id;
        const isHalfYearly = plan.duration_type === "half_yearly";
        const isProcessing = payingPlanId === plan.id;

        return (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`relative w-full max-w-sm rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl ${
              isActive ? "bg-[#0F172A] text-white" : "bg-white text-black"
            }`}
          >
            {/* RECOMMENDED Badge */}
            {isHalfYearly && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                Recommended
              </div>
            )}

            {/* Title Pill */}
            <div className="flex justify-center mt-4">
              <div
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? "bg-white text-[#0F172A] border-white"
                    : "bg-gray-200 text-gray-600 border-gray-300"
                }`}
              >
                <span className="rounded-full w-4 h-4 border-2 border-current flex items-center justify-center">
                  {isActive && (
                    <span className="w-2 h-2 bg-[#0F172A] rounded-full"></span>
                  )}
                </span>
                {plan.name}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col justify-between min-h-[460px]">
              {/* Price Section */}
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">
                  ${plan.amount}
                  <span className="text-base font-normal">
                    {plan.duration_type === "monthly"
                      ? "/mn"
                      : plan.duration_type === "half_yearly"
                      ? "/6mo"
                      : "/yr"}
                  </span>
                </div>
                <div className="text-sm line-through text-gray-400">
                  ${+plan.amount + 40}
                </div>
                <div
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    isActive ? "bg-white text-[#0F172A]" : "bg-black text-white"
                  }`}
                >
                  Save: $40
                </div>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-2 text-sm">
                {plan.descriptions?.map((desc) => (
                  <li key={desc.id} className="flex items-center gap-2">
                    <span className="text-blue-500">●</span>
                    {desc.text}
                  </li>
                ))}
              </ul>

              {/* Buy Now Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(plan);
                }}
                disabled={isProcessing}
                className={`w-full mt-6 rounded-md text-sm font-semibold py-2 transition ${
                  isActive
                    ? "bg-white text-[#0F172A] hover:bg-gray-200"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isProcessing ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;
