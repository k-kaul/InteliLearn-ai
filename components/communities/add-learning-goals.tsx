import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function AddLearningGoal(){
    const [showNewGoalForm,setShowNewGoalForm] = useState(false);
    return (
        <div>
            {
                showNewGoalForm ? (
                    <div className="space-y-3 pt-3 border-t">
                        <Textarea 
                            placeholder="What do you want to learn?"
                            value={""}
                            onChange={() => {}}
                            rows={4}
                            className="resize-none"
                        />
                        <div className="flex gap-2">
                            <Button className={""} size={"sm"}>Add Goal</Button>
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