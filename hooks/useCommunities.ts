import { client } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useCommunities(){
    return useQuery({
        queryKey: ["communities"],
        queryFn: async() => {
            const res = await client.api.communities.$get();
            if(!res.ok) throw new Error("failed to fetch Communities");
            return res.json()
        }
    }) 
}

export function useCommunityGoals(communityId: string){
    return useQuery({
        queryKey:["communityGoals", communityId],
        queryFn: async () => {
            const res = await client.api.communities[":communityId"].goals.$get({
                param: { communityId }
            });
            if(!res.ok) throw new Error("Failed to fetch community goals");

            return res.json()
        }, 
        enabled: !!communityId
    })
}