import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useCreateLearningGoal } from "@/hooks/use-goals";

export default function AddLearningGoal({ selectedCommunityId }: { selectedCommunityId: string}){
    const [showNewGoalForm,setShowNewGoalForm] = useState(false);
    const [newGoalText, setNewGoalText] = useState("");
    const createGoalMutation = useCreateLearningGoal();

    async function handleCreateGoal(){
        try {
            //mutation
            await createGoalMutation.mutateAsync({
                    communityId: selectedCommunityId,
                    title: newGoalText.slice(0,100),
                    description: newGoalText,
                    tags: [],
                }
            )
            setNewGoalText("")
            setShowNewGoalForm(false)
        } catch (error) {
            console.error("Error creating learning goal", error)
        }    
    }

    return (
        <div>
            {
                showNewGoalForm ? (
                    <div className="space-y-3 pt-3 border-t">
                        <Textarea 
                            placeholder="What do you want to learn?"
                            value={newGoalText}
                            onChange={(e) => setNewGoalText(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                        <div className="flex gap-2">
                            <Button 
                                className={""} 
                                size={"sm"} 
                                onClick={handleCreateGoal}
                                disabled={createGoalMutation.isPending || newGoalText.length === 0}
                            >Add Goal</Button>
                            <Button className={""} size={"sm"} 
                                variant={"outline"}
                                onClick={() => setShowNewGoalForm(false)}
                            >Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <Button onClick={() => setShowNewGoalForm(true)} variant={"outline"} className={"w-full"}>
                        <PlusIcon />Add New Learning Goal
                    </Button>
                )
            }
        </div>
    )
}