import Link from "next/link";
import { Button } from "../ui/button";

export default function CtaSection(){
    return (
        <section className="section-container section-padding">
            <div className="border rounded-lg p-8 sm:p-12 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2>Stop Learning Alone</h2>
                    <p className="text-lg mb-8">Get matched with someone who is learning the same things. Hold each other accountable. Make real progress.</p>
                    <Link href={"/sign-up"}>
                        <Button size="lg">Get Started for Free</Button>
                    </Link>
                </div>
            </div>            
        </section>
    )
}