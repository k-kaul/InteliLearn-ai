import Link from "next/link";
import { Button } from "../ui/button";

export default function CtaSection(){
    return (
        <section className="bg-[#050816]">
            <div className="section-container section-padding rounded-lg p-8 sm:p-12 text-center text-white">
                <div className="max-w-2xl mx-auto">
                    <h2 className="section-heading">Stop Learning Alone</h2>
                    <p className="text-lg mb-8 text-slate-200 section-description">Get matched with someone who is learning the same things. Hold each other accountable. Make real progress.</p>
                    <Link href={"/sign-up"}>
                        <Button size="lg" className="p-5 px-10 hover:bg-white text-black rounded-4xl shadow-md min-w-xs">Get Started for Free</Button>
                    </Link>
                </div>
            </div>            
        </section>
    )
}