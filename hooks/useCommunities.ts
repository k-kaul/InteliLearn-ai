import { client } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useAllCommunities(){
    return useQuery({
        queryKey: ["allCommunities"],
        queryFn: async () => {
            const res = await client.api.communities.all.$get()
            if(!res.ok) throw new Error("Failed to fetch all communities");
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

export function useJoinCommunity(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (communityId:string) => {
            const res = await client.api.communities[":communityId"].join.$post({
                param: { communityId }
            });

            if(!res.ok) throw new Error("Failed to join community");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] })
        }, 
        onError: (error) => {
            console.log("error joining community", error)
        }
    })
}