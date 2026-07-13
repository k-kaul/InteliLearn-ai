import Link from "next/link";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { RocketIcon, ZapIcon } from "lucide-react";
import { MotionDiv } from "../ui/motion-div";


export default function HeroSection(){
    return (
        <BackgroundBeamsWithCollision>
            <section className="relative overflow-hidden ">
                <div className="relative section-container section-padding flex flex-col max-w-5xl">
                    <div className="text-center ">
                        <Badge variant={"outline"} className="mb-6 text-sm font-medium bg-amber-200">Powered By AI</Badge>
                    </div>
                    <h1 className="text-7xl section justify-items-center"> Find Your Perfect AI Learning Partner</h1>
                    <p className="font-light">
                        Join communities, set your learning goals, and get matched with learers who share your passion. Chat, collaboarte, and grow together with AI-powered insights.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <MotionDiv 
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: .2 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <Link href="/sign-up">
                                <span>
                                    <Button variant="outline" className="p-5 bg-white text-black">
                                        <RocketIcon />
                                        Get Started for Free
                                    </Button>
                                </span>
                            </Link>
                        </MotionDiv>
                        <MotionDiv 
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.08, y:-2 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <Link href="/#pricing" className="group">
                                    <span>
                                    <Button variant="outline" className="p-5 bg-red-500 text-black font-bold group-hover:scale-110">
                                        <ZapIcon />
                                        Buy a Plan
                                    </Button>
                                </span>
                            </Link>
                        </MotionDiv>
                    </div>
                </div>
            </section>
        </BackgroundBeamsWithCollision>
    )
}