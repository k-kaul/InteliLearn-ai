import { useAiPartners } from "@/hooks/use-ai-partner";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";

export default function AIMatching({ totalGoals, selectedCommunityId }: { totalGoals:number; selectedCommunityId:string; }){
    const aiPartnerMutation = useAiPartners();

    async function handleFindAiPartners(){
        try {
            await aiPartnerMutation.mutateAsync(selectedCommunityId);
            toast.add({
                title: "AI partners found successfully",
                type: "success"
            })
        } catch (error) {
            console.error("Error finding AI partners", error);
            toast.add({
                title: "Error finding AI partners",
                type: "fail"
            })
        }
    }

    return (
        <div className="text-center py-8">
            <div className="mb-3">
                <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
                <p>
                    Our AI will analyze your learning goals and automatically match you with the most compatible learning partners in this community.
                </p>
            </div>
            <Button size={"lg"} 
                disabled={totalGoals === 0}
                onClick={handleFindAiPartners}
                >Find Partners with AI</Button>
            {
                totalGoals > 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">{`You have ${totalGoals} learning${totalGoals === 1 ? " goal" : " goals"} set`}</p>
                ) : (
                    <p className="mt-4 text-sm text-muted-foreground">Add learning goals first to enable AI matching</p>
                )
            }
        </div>
    )
}