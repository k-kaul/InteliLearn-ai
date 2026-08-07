import { client } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useAiPartners(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (communityId:string) => {
            const res = await client.api.matches[":communityId"].aimatch.$post({
                param: {communityId},
            });

            if(!res.ok) throw new Error("Failed to find Ai partner");

            return res.json();
        },
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({ queryKey: ["potentialPartners", variables]})
        }, 
        onError: (error) => {
            console.error("Error finding Ai partner", error)
        }
    });
};

export const useMatches = () => {
    return useQuery({
        queryKey: ["matches"],
        queryFn: async () => {
            const res = await client.api.matches.allmatches.$get();
            if(!res.ok) throw new Error("failed to fetch potential matches");
            return res.json();
        }
    })
}

export const useAcceptMatch = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: async (matchId: string) => {
            const res = await client.api.matches[":matchId"].accept.$put(
                {
                    param: {matchId}
                }
            );
            if(!res.ok) throw new Error("failed to accept match");
            return res.json()
        },
        onSuccess: (_,matchId) => {
            queryClient.invalidateQueries({queryKey: ['matches']});
            router.push(`/chat/${matchId}`);
        },
        onError: (error) => {
            console.error("Error accepting match", error)
        }
    });
}