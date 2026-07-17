"use client"
import AddLearningGoal from "@/components/communities/add-learning-goals";
import AIMatching from "@/components/communities/ai-matching";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCommunities, useCommunityGoals } from "@/hooks/useCommunities";
import { BotIcon } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

export default function CommunitiesPage(){
    const [selectedCommunity,setSelectedCommunity] = useState<string|null>(null);
    const [activeTab, setActiveTab] = useState<"goals" | "matches">("goals");

    const { data: communities, isLoading: isLoadingUserCommunities, error:errorUserCommunities }  = useCommunities();

    const { data: communityGoals, isLoading: isLoadingCommunityGoals, error: errorCommunityGoals } = useCommunityGoals(selectedCommunity || "");
    
    useEffect(() => {
        if(communities && communities.length > 0 && !selectedCommunity){
            startTransition(() => {
                setSelectedCommunity(communities[0].community.id)
            })
        }
    },[communities, selectedCommunity]);

    // console.log(communityGoals)

    return (
        <div className="page-wrapper">
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Communities</CardTitle>
                        <CardDescription>{ communities?.length } {"joined"}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {
                            communities?.map((community) => (
                                <Button key={community.id} 
                                    className="w-full justify-start" 
                                    onClick={() => setSelectedCommunity(community.community.id)}
                                    variant={selectedCommunity === community.community.id ? "default" : "outline"} >
                                    
                                    { community.community.name}

                                </Button>
                             ))
                        }
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex gap-2 mb-4">
                            <Button
                                onClick={ () => setActiveTab("goals") }
                                variant={activeTab === "goals" ? "default" : "outline"}
                            >
                                My Goals
                            </Button>
                            <Button
                                onClick={() => setActiveTab("matches")}
                                variant={activeTab === "matches" ? "default" : "outline"}
                            >
                                <BotIcon className="size-4" /> Find Partners with AI
                            </Button>
                        </div>
                        <CardTitle>
                            {
                                activeTab === "goals" ? "Learning Goals" : "Potential Learning Matches"
                            }
                        </CardTitle>
                        <CardDescription>
                            {
                                activeTab === "goals" ? `${communityGoals?.length} ${communityGoals?.length === 1 ? "goal": "goals"} in selected community`: "Members with similar learning goals."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            activeTab === "goals" ? (
                                <div className="space-y-2">
                                    { communityGoals?.map((goal) => (
                                        <div key={goal.id}>
                                        <Card >
                                            <CardHeader>
                                                <CardTitle className="text-sm">{goal.title}</CardTitle>
                                                <CardDescription>{goal.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                        </div>
                                    ))}
                                    <AddLearningGoal />
                                </div>
                            ) : (
                                <AIMatching totalGoals={communityGoals?.length || 0}/>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}