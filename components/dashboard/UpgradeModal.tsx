"use client";

import { useState } from "react";
import Link from "next/link";
import { initializePaystack } from "@/lib/actions/payment";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONVERSION_RATE = 1400;

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = async (planName: string) => {
    if (planName === "Free") {
      onClose();
      return;
    }

    setLoadingPlan(planName);
    try {
      const planKey = planName.toUpperCase() as 'PLUS' | 'PRO' | 'PREMIUM';
      const data = await initializePaystack(planKey);
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Failed to start payment. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Great for birthdays and small celebrations.",
      features: [
        "Up to 100 uploads",
        "Unlimited guests",
        "Saved for 7 days",
        "Active for 24 hours"
      ],
      buttonText: "Stay Free",
      isPopular: false,
    },
    {
      name: "Plus",
      price: (39 * CONVERSION_RATE).toLocaleString(),
      oldPrice: (79 * CONVERSION_RATE).toLocaleString(),
      description: "Perfect for weddings & mid-size events.",
      features: [
        "Up to 500 uploads",
        "Saved for 3 months",
        "Active for 1 month",
        "HQ Downloads"
      ],
      buttonText: "Upgrade to Plus",
      isPopular: false,
    },
    {
      name: "Pro",
      price: (99 * CONVERSION_RATE).toLocaleString(),
      oldPrice: (199 * CONVERSION_RATE).toLocaleString(),
      description: "The ultimate choice for large-scale events.",
      features: [
        "Unlimited uploads",
        "Saved for 1 year",
        "Active for 1 year",
        "Live Slideshow"
      ],
      buttonText: "Upgrade to Pro",
      isPopular: true,
    }
  ];

  return (
    <div className="fixed inset-0 z-[3000] flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-text/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[1000px] rounded-t-[32px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] relative z-10 transition-transform duration-500 ease-out animate-in slide-in-from-bottom-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Handle for mobile */}
        <div className="flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 bg-border-color rounded-full"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-bg-light transition-colors z-20"
        >
          <i className="fa-solid fa-xmark text-lg text-gray-text"></i>
        </button>

        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-10">
            <div className="bg-gradient-to-r from-primary-lilac to-dark-lilac text-white font-black py-1.5 px-6 rounded-full text-[10px] inline-block tracking-[0.2em] shadow-lg uppercase mb-4">
              🔥 Limited Time Offer: 50% OFF
            </div>
            <h3 className="text-3xl font-black text-dark-text tracking-tight mb-2">Upgrade Your Event</h3>
            <p className="text-gray-text font-medium">Unlock more features and keep your memories forever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`card !p-6 flex flex-col relative transition-all duration-300 hover:shadow-xl ${
                  plan.isPopular ? 'border-2 border-primary-lilac scale-[1.02] z-10 shadow-primary-lilac/10' : 'border-border-color'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-lilac text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="text-lg font-black text-dark-text mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-dark-text">₦{plan.price}</span>
                    {plan.oldPrice && (
                      <span className="text-sm text-gray-text line-through opacity-50 font-bold ml-1">₦{plan.oldPrice}</span>
                    )}
                  </div>
                </div>

                <p className="text-[13px] text-gray-text mb-6 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>

                <ul className="list-none p-0 flex flex-col gap-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[13px] text-dark-text font-semibold">
                      <span className="text-success font-bold text-sm">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  disabled={!!loadingPlan}
                  className={`btn w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all ${
                    plan.isPopular 
                      ? 'btn-primary shadow-lg shadow-primary-lilac/30' 
                      : index === 0 ? 'btn-outline border-2' : 'btn-outline border-2'
                  } ${loadingPlan === plan.name ? 'opacity-70' : ''}`}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  {loadingPlan === plan.name ? "Processing..." : plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center border-t border-border-color pt-8">
            <p className="text-xs text-gray-text font-medium inline-flex items-center gap-2">
              <i className="fa-solid fa-shield-check text-success"></i>
              Secure payment processed by Stripe. No hidden fees.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e6e1f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1c8e2;
        }
      `}</style>
    </div>
  );
}
