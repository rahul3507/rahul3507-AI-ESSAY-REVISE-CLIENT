/** @format */

import { useState } from "react";

const PricingCards = () => {
  const [selected, setSelected] = useState(2); // Half yearly selected by default

  // Static pricing data
  const packageData = [
    {
      id: 1,
      name: "Monthly",
      amount: 55,
      duration_type: "monthly",
      descriptions: [
        { id: 1, text: "Automatic bot building" },
        { id: 2, text: "Team collaboration" },
        { id: 3, text: "AI model training" },
        { id: 4, text: "Team collaboration" },
        { id: 5, text: "Multilingual AI" },
        { id: 6, text: "Team collaboration" },
      ],
    },
    {
      id: 2,
      name: "Half Year",
      amount: 255,
      duration_type: "half_yearly",
      descriptions: [
        { id: 1, text: "Automatic bot building" },
        { id: 2, text: "Team collaboration" },
        { id: 3, text: "AI model training" },
        { id: 4, text: "Multilingual AI" },
        { id: 5, text: "Team collaboration" },
      ],
    },
    {
      id: 3,
      name: "Yearly",
      amount: 555,
      duration_type: "yearly",
      descriptions: [
        { id: 1, text: "Automatic bot building" },
        { id: 2, text: "AI model training" },
        { id: 3, text: "Team collaboration" },
        { id: 4, text: "Multilingual AI" },
        { id: 5, text: "AI model training" },
      ],
    },
  ];

  const handleBuyNow = (plan) => {
    console.log("Selected plan:", plan);
    // Handle purchase logic here
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 md:p-14 md:bg-gradient-to-br from-gray-200 to-gray-50 rounded-2xl">
      {packageData?.map((plan) => {
        const isSelected = selected === plan.id;
        const isHalfYearly = plan.duration_type === "half_yearly";

        return (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`relative w-full max-w-sm rounded-xl shadow-md cursor-pointer transition-all border border-gray-200 duration-300 hover:shadow-md ${
              isSelected ? "bg-[#0F172A] text-white" : "bg-white text-black"
            }`}
          >
            {isHalfYearly && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                Recommended
              </div>
            )}

            <div className="flex justify-center mt-4">
              <div
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  isSelected
                    ? "bg-white text-[#0F172A] border-white"
                    : "bg-gray-200 text-gray-600 border-gray-200"
                }`}
              >
                <span className="rounded-full w-4 h-4 border-2 border-current flex items-center justify-center">
                  {isSelected && (
                    <span className="w-2 h-2 bg-[#0F172A] rounded-full"></span>
                  )}
                </span>
                {plan.name}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between md:min-h-[460px]">
              <div className="text-center">
                <div className="text-3xl font-semibold mb-1">
                  ${plan.amount}
                  <span className="text-base font-normal">
                    {plan.duration_type === "monthly"
                      ? "/mn"
                      : plan.duration_type === "half_yearly"
                      ? "/6mo"
                      : "/yr"}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm">
                {plan.descriptions?.map((desc) => (
                  <li key={desc.id} className="flex items-center gap-2">
                    <span className="text-blue-500">●</span>
                    {desc.text}
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(plan);
                }}
                className={`w-full mt-6 rounded-md text-sm font-semibold py-2 transition ${
                  isSelected
                    ? "bg-white text-[#0F172A] hover:bg-gray-200 cursor-pointer"
                    : "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                }`}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;

// import { useState } from "react";
// import usePackagePlan from "../../../components/hook/usePackagePlan";
// import useLoggedUser from "../../../components/hook/useLoggedUser";
// import apiClient from "../../../lib/api-client";
// import LoadingSpinner from "../../../components/LoadingSpinner";

// const PricingCards = () => {
//   const { user } = useLoggedUser();
//   const { packageData, loading } = usePackagePlan();
//   const [selected, setSelected] = useState(null);
//   const [payingPlanId, setPayingPlanId] = useState(null);

//   const handleBuyNow = async (plan) => {
//     try {
//       setPayingPlanId(plan.id);

//       const response = await apiClient.post("/payment/create-checkout-session/", {
//         price_id: plan.price_id,
//         plan_name: plan.name,
//         duration_type: plan.duration_type,
//       });

//       const checkoutUrl = response.data?.checkout_url;

//       if (checkoutUrl) {
//         window.location.href = checkoutUrl;
//       } else {
//         alert("Payment initialization failed. Try again.");
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       alert("Something went wrong during payment.");
//     } finally {
//       setPayingPlanId(null);
//     }
//   };

//   if (loading) return <LoadingSpinner/>;

//   return (
//     <div className="flex flex-col md:flex-row justify-center gap-6 md:p-14 md:bg-gradient-to-br from-gray-200 to-gray-50 rounded-2xl">
//       {packageData?.map((plan) => {
//         const isCurrentPlan = plan.id === user?.plan;
//         const isSelected = selected === plan.id || isCurrentPlan;
//         const isHalfYearly = plan.duration_type === "half_yearly";
//         const isProcessing = payingPlanId === plan.id;

//         return (
//           <div
//             key={plan.id}
//             onClick={() => setSelected(plan.id)}
//             className={`relative w-full max-w-sm rounded-xl shadow-md cursor-pointer transition-all border border-gray-200 duration-300 hover:shadow-md ${
//               isSelected ? "bg-[#0F172A] text-white" : "bg-white text-black"
//             }`}
//           >
//             {isHalfYearly && (
//               <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
//                 Recommended
//               </div>
//             )}

//             <div className="flex justify-center mt-4">
//               <div
//                 className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
//                   isSelected
//                     ? "bg-white text-[#0F172A] border-white"
//                     : "bg-gray-200 text-gray-600 border-gray-200"
//                 }`}
//               >
//                 <span className="rounded-full w-4 h-4 border-2 border-current flex items-center justify-center">
//                   {isSelected && (
//                     <span className="w-2 h-2 bg-[#0F172A] rounded-full"></span>
//                   )}
//                 </span>
//                 {plan.name}
//               </div>
//             </div>

//             <div className="p-6 flex flex-col justify-between md:min-h-[460px]">
//               <div className="text-center">
//                 <div className="text-3xl font-semibold mb-1">
//                   ${plan.amount}
//                   <span className="text-base font-normal">
//                     {plan.duration_type === "monthly"
//                       ? "/mn"
//                       : plan.duration_type === "half_yearly"
//                       ? "/6mo"
//                       : "/yr"}
//                   </span>
//                 </div>
//               </div>

//               <ul className="mt-6 space-y-2 text-sm">
//                 {plan.descriptions?.map((desc) => (
//                   <li key={desc.id} className="flex items-center gap-2">
//                     <span className="text-blue-500">●</span>
//                     {desc.text}
//                   </li>
//                 ))}
//               </ul>

//               {isCurrentPlan ? (
//                 <div className="w-full mt-6 py-2 rounded-md text-center text-sm font-semibold bg-gray-300 text-gray-800 cursor-default">
//                   Your Plan
//                 </div>
//               ) : (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleBuyNow(plan);
//                   }}
//                   disabled={isProcessing}
//                   className={`w-full mt-6 rounded-md text-sm font-semibold py-2 transition ${
//                     isSelected
//                       ? "bg-white text-[#0F172A] hover:bg-gray-200 cursor-pointer"
//                       : "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
//                   } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {isProcessing ? "Processing..." : "Subscribe Now"}
//                 </button>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PricingCards;
