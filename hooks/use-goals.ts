"use client"
import { client } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLearningGoal(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(goal: {
                communityId: string,
                title: string,
                description: string,
                tags: string[],
        }) => {            
            const res = await client.api.communities.goals.$post({
                param: {communityId: goal.communityId},
                json: { 
                    communityId: goal.communityId,
                    title: goal.title,
                    description: goal.description,
                    tags: goal.tags,
                 },
            });
            
            if(!res.ok) throw new Error("Failed to create learning goal");

            return res.json();
        },
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({
                queryKey: ["communityGoals", variables.communityId]
            });
        },
        onError: (error) => {
            console.error("Error creating learning goals", error)
        }
    });
}