import { PricingTable } from "@clerk/nextjs";
import SectionHeading from "./section-heading";

export default function PricingSection(){
    return (
        <section className="space-y-15 bg-amber-200" id="pricing">
            <div className="section-container section-padding">
                <SectionHeading title="Simple, Transparent Pricing" description="Choose the plan that works best for you. Start free and upgrade as you grow."/>
                <div className="max-w-6xl mx-auto">
                    <PricingTable />
                </div>
            </div>
        </section>
    )
}