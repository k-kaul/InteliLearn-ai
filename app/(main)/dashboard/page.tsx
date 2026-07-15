"use client"

import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

    const pendingMatches = 6
    
    if(isLoadingUserCommunities) return <div>Loading...</div>
    if(errorUserCommunities) return <div>Error: {errorUserCommunities.message}</div>

    return (
        <div className="page-wrapper">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Page</h1>
                <p className="text-muted-foreground">Welcome Back, {user?.firstName || "User"}</p>
            </div>

            {/* Pending matches */}            
            <Card className="border-primary">
                <CardHeader>
                    <CardTitle>
                        🤝 You have {pendingMatches} new {" "} 
                        { pendingMatches === 1 ? "match!" : "matches!" }
                        </CardTitle>
                        <CardDescription>Review and accept your matches to start chatting.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href={"/chat"}>
                        <Button>Review Matches</Button>
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
                    value={6}
                />
                <StatsCard 
                    title="Active Matches" 
                    value={6}
                />
                <StatsCard 
                    title="Pending Matches" 
                    value={6}
                />
            </div>         
            
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent chats */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <UsersIcon className="size-4 mr-2 text-primary"/>Recent Chats
                            </CardTitle>
                            <Link href="/communities">
                                <Button variant={"outline"} size={"sm"}>View All</Button>
                            </Link>
                        </div>
                        <CardDescription>Chats:</CardDescription>
                    </CardHeader>                    
                </Card>

                {/* Communities */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                                <UsersIcon className="size-4 mr-2 text-primary"/>Communities
                            </CardTitle>
                            <Link href="/communities">
                                <Button variant={"outline"} size={"sm"}>Manage</Button>
                            </Link>
                        </div>
                        <CardDescription>Communities you are a part of:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {   
                                userCommunities?.map((community,idx) => (
                                    <Card key={idx}>
                                        <Link href={`/communities/${community.id}`}>
                                            <CardHeader>
                                                <CardTitle className="text-sm">{community.community.name}</CardTitle>
                                                <CardDescription className="text-sm">{community.community.description}</CardDescription>
                                            </CardHeader>
                                        </Link>
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