import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { RocketIcon, ZapIcon } from "lucide-react";
import { MotionDiv } from "../ui/motion-div";
import { BackgroundBeams } from "../ui/background-beams";


export default function HeroSection(){
    return (
        <section className="relative overflow-hidden">
            <div className="relative section-container section-padding flex flex-col items-center justify-center max-w-5xl min-h-screen">
                <div className="mx-auto">
                    <div className="text-center">
                        <Badge variant={"outline"} className="p-3 px-5 mb-6 text-sm font-medium bg-amber-300 border-amber-300 shadow-xl">Powered By AI</Badge>
                    </div>
                    <div className="p-5">
                        <h1 className="text-7xl section justify-items-center text-center text-slate-50">
                            Find Your Perfect Learning Partner with AI
                        </h1>
                        <p className="font-light m-5 text-center text-lg text-slate-200">
                            Join communities, set your learning goals, and get matched with learers who share your passion. <br />Chat, collaboarte, and grow together with AI-powered insights.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center m-5 items-center">
                        <MotionDiv 
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.1 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <Link href="/sign-up">
                                <span>
                                    <Button variant="outline" className="p-5 px-10 bg-white text-black rounded-4xl shadow-md min-w-xs">
                                        <RocketIcon />
                                        Get Started for Free
                                    </Button>
                                </span>
                            </Link>
                        </MotionDiv>
                        <MotionDiv 
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.1 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y:0 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <Link href="/#pricing" className="group">
                                <span>
                                    <Button variant="outline" 
                                        className="p-5 px-10 bg-amber-500 text-black font-bold group-hover:scale-100 rounded-4xl shadow-md min-w-xs border-none">
                                        <ZapIcon />
                                        Buy a Plan
                                    </Button>
                                </span>
                            </Link>
                        </MotionDiv>
                    </div>
                </div>
            </div>
            <BackgroundBeams className="bg-[#050816] absolute -z-5"/>       
        </section>
    )
}