"use client"

import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useMatches } from "@/hooks/use-ai-partner";
import { client } from "@/lib/api-client";
import { useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { UsersIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardPage(){
    const { user } = useUser();
    
    const { data: userCommunities, isLoading: isLoadingUserCommunities, error:errorUserCommunities }  = useQuery({
        queryKey: ["communities"],
        queryFn: async() => {
            const res = await client.api.communities.$get();
            if(!res.ok) throw new Error("failed to fetch Communities");
            // console.log(res.json())
            return res.json()
        }
    })

    const {data: allmatches} = useQuery({
        queryKey: ["allMatches"],
        queryFn: async () => {
            const res = await client.api.matches.allmatches.$get();
            if(!res.ok) throw new Error("Failed to fetch pending matches");
            return res.json();
        }
    });

    const pendingMatches = allmatches?.filter((match) => match.status === "pending");
    const activeMatches = allmatches?.filter((match) => match.status === "accepted");
    
    const {data: learningGoals} = useQuery({
        queryKey: ['learingGoals'],
        queryFn: async () => {
            const res = await client.api.communities.goals.$get();
            if(!res.ok) throw new Error("Failed to fetch learning goals");
            
            return res.json();
        }
    });

    const {data: currentMatches} = useMatches();
    
    if(isLoadingUserCommunities) return <div>Loading...</div>
    if(errorUserCommunities) return <div>Error: {errorUserCommunities.message}</div>

    return (
        <div className="page-wrapper">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Page</h1>
                <p className="text-muted-foreground">Welcome Back, {user?.firstName || "User"}</p>
            </div>

            {/* Pending matches */}            
            <Card className="border-primary shadow-sm">
                <CardHeader>
                    <CardTitle>
                        🤝 You have {pendingMatches?.length} new {" "} 
                        { pendingMatches?.length === 1 ? "match!" : "matches!" }
                        </CardTitle>
                        <CardDescription>Review and accept your matches to start chatting.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href={"/chat"}>
                        <Button className={"shadow-sm"}>Review Matches</Button>
                    </Link>
                </CardContent>
            </Card>

            {/* User stats cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <StatsCard 
                    title="Your Communities" 
                    value={userCommunities?.length || 0}
                />
                <StatsCard 
                    title="Learning Goals"
                    value={learningGoals?.length || 0}
                />
                <StatsCard 
                    title="Active Matches" 
                    value={activeMatches?.length || 0}
                />
                <StatsCard 
                    title="Pending Matches" 
                    value={pendingMatches?.length || 0}
                />
            </div>         
            
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent chats */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <UsersIcon className="size-4 mr-2 text-primary"/>Recent Chats
                            </CardTitle>
                            <Link href="/communities">
                                <Button variant={"outline"} size={"sm"} className="shadow-sm">View All</Button>
                            </Link>
                        </div>
                        {/* recent chats */}
                        <CardContent>
                            <div className="flex flex-col gap-3">
                            {
                                currentMatches?.map((match) => (
                                    <Link key={match.id} href={`/chat/${match.id}`}>
                                        <Card className="shadow-xs">
                                            <CardHeader>
                                                <div className="flex items-center gap-4">
                                                    <UserAvatar name={match.partner.name} imageUrl={match.partner.imageUrl || ""}/>
                                                    <div className="flex-1 min-w-8 gap-2">
                                                        <CardTitle className={"font-medium"}>
                                                            {match.partner.name}
                                                        </CardTitle>
                                                        <CardDescription className="text-xs text-muted-foreground mt-1">
                                                            <span>
                                                                {match.userGoals.map((g) => g.title).join(", ")}
                                                            </span>
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                ))
                            }
                            </div>
                        </CardContent>
                    </CardHeader>                    
                </Card>

                {/* Communities */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <UsersIcon className="size-4 mr-2 text-primary"/>Communities
                            </CardTitle>
                            <Link href="/communities">
                                <Button variant={"outline"} size={"sm"} className={"shadow-sm"}>Manage</Button>
                            </Link>
                        </div>
                        <CardDescription>Communities you are a part of:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {   
                                userCommunities?.map((community,idx) => (
                                    <Card key={idx} className="shadow-xs">
                                        <CardHeader>
                                            <CardTitle className="text-sm">{community.community.name}</CardTitle>
                                            <CardDescription className="text-sm">{community.community.description}</CardDescription>
                                        </CardHeader>
                                    </Card>                                    
                                ))
                            }
                        </div>
                    </CardContent>                                   
                </Card>
            </div>          
        </div>
    )
} 