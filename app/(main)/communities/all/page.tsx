"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllCommunities, useCommunities, useJoinCommunity } from "@/hooks/useCommunities";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AllCommunitiesPage(){
    // const [isJoined, setisJoined] = useState(false);
    const { data:allCommunities, error, isLoading } = useAllCommunities();
    const { data:userCommunities } = useCommunities();
    const joinCommunityMutation = useJoinCommunity();
    
    async function handleJoinCommunity(communityId:string){
        await joinCommunityMutation.mutateAsync(communityId);
    }

    function isJoined(communityId:string){
        return userCommunities?.some((community) => community.community.id === communityId);
    }

    if(isLoading) return <div>Loading.....</div>
    if(error) return <div>Error: {error.message}</div>

    return (
        <div className="page-wrapper">    
            <Link href={"/communities"}>
                <Button variant={"outline"}> 
                    <ArrowLeftIcon/>
                    Back to My Communities
                </Button>
            </Link>
            <div className="space-y-4 mt-4">
                <h2 className="text-xl font-bold">Browse Communities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {
                        allCommunities?.map((community) => (
                            <Card key={community.id}>
                                <CardHeader>
                                    <CardTitle>{community.name}</CardTitle>
                                    <CardDescription>{community.description}</CardDescription>                            
                                    <CardDescription className="px-0 mt-2">
                                        <Button 
                                            className="w-full" 
                                            disabled={isJoined(community.id)}
                                            onClick={() => handleJoinCommunity(community.id)}
                                        >{
                                            isJoined(community.id) ? <><CheckIcon />Joined</> : "Join Community"
                                        }
                                            </Button>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    }
                </div>
            </div>
            
        </div>
    )
} 