import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import {auth } from "@clerk/nextjs/server";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MessageCircleIcon, TrophyIcon, UsersIcon } from "lucide-react";

export default async function Header(){    
    const { has } = await auth();
    const isPro = has({
        plan: "pro"
    });
    return (
        <header className="bg-[#050816] text-white border-b-0">
            <div className="flex justify-between layout-container ">
                <div className="flex items-center gap-6">
                    <Link href={"/"} className="font-bold text-xl">InteliLearn</Link>
                    <Show when={"signed-in"}>
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href={"/dashboard"}>
                                <Button variant={"ghost"} size={"sm"}>Dashboard</Button>
                            </Link>
                            <Link href={"/chat"}>
                                <Button variant={"ghost"} size={"sm"}>
                                    <MessageCircleIcon className="size-4 text-primary"/> Chat
                                </Button>
                            </Link>
                            <Link href={"/communities"}>
                                <Button variant={"ghost"} size={"sm"}>
                                    <UsersIcon className="size-4 text-primary"/>Communities
                                </Button>
                            </Link>
                        </nav>
                    </Show>
                </div>
                <div className="flex items-center gap-4">
                    <Show when="signed-out">
                        <SignInButton />
                        <SignUpButton>
                            <Button variant={"outline"}> Sign Up </Button>
                        </SignUpButton>
                    </Show>
                </div>
                
                <Show when="signed-in">
                    <div className="flex items-center gap-4 text-white">                    
                        {
                            isPro ? <Badge variant={"outline"} className="flex items-center gap-2 text-white">
                                        <TrophyIcon className="size-3 text-white"/>
                                        Pro
                                    </Badge> : "Free"
                        }
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "size-9",
                            }
                        }}/>                    
                    </div>                    
                </Show>
            </div>
          </header>
    )
}