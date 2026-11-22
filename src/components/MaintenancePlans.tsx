import { ArrowUpRight } from 'lucide-react';
import { MAINTENANCE_PLANS, type MaintenancePlan } from '../data/pricingData';

interface MaintenancePlansProps {
  onSelectPlan: (plan: MaintenancePlan) => void;
}

export function MaintenancePlans({ onSelectPlan }: MaintenancePlansProps) {
  return (
    <section id="plans" className="py-14 sm:py-20 border-b border-[#141D17]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1F5132] mb-2">Regular Maintenance Plans</p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#141D17] mb-3"
              style={{ textWrap: 'balance' }}
            >
              Fixed visit pricing with zero lock-in contracts
            </h2>
            <p className="text-sm sm:text-base text-[#445248]">
              Fortnightly or monthly visits. Charged automatically after each visit — pause or
              cancel anytime with 24 hours&apos; notice.
            </p>
          </div>

          {/* Launch Offer Callout */}
          <div className="bg-[#142119] text-white rounded-xl p-4 sm:p-5 max-w-md">
            <p className="text-xs font-mono text-[#A9DFBA] mb-1">
              Launch Offer · Valid until 31 January 2027
            </p>
            <p className="text-sm font-medium leading-snug">
              $20 off your first visit when you sign up to any plan for 3 months.
            </p>
          </div>
        </div>

        {/* Plans Table */}
        <div className="bg-white rounded-xl border border-[#141D17]/10 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#141D17]/10 bg-[#ECEEE9]/60 text-xs font-medium text-[#445248]">
                <th className="py-3.5 px-5">Plan</th>
                <th className="py-3.5 px-5">What&apos;s included</th>
                <th className="py-3.5 px-5">Price</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141D17]/10 text-sm">
              {MAINTENANCE_PLANS.map((plan) => (
                <tr key={plan.id} className="hover:bg-[#F6F7F4]/60 transition-colors">
                  <td className="py-4 px-5 font-semibold text-[#141D17] whitespace-nowrap">
                    {plan.name}
                  </td>
                  <td className="py-4 px-5 text-[#445248]">{plan.included}</td>
                  <td className="py-4 px-5 font-mono tabular-nums font-semibold text-[#1F5132] whitespace-nowrap">
                    {plan.price}
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelectPlan(plan)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1F5132] hover:text-[#141D17] hover:underline cursor-pointer"
                    >
                      Choose plan
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
