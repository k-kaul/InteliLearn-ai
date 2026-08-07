"use client"
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { UserAvatar } from "../ui/user-avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function ChatInterface({conversationId}: {
    conversationId:string;
}){
    const messages = [
        {
            id:1,
            content: "How are you",
            createdAt: new Date(),
            sender: "John Doe"

        }, 
        {
            id:2,
            content: "I am good",
            createdAt: new Date(),
            sender: "Jane Doe"
        }
    ]
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
                <Card className="h-150 flex flex-col">
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                            <UserAvatar 
                                name="John Doe"
                                imageUrl="https://github.com/shadcn.png"
                            />
                            <CardTitle>John Doe</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                            { messages.map((message) => {
                                const isCurrentUser = message.sender === "John Doe";
                                const user = isCurrentUser ? "John Doe" : "Jane Doe";

                            return (
                                    <div key={message.id} className="space-y-4">
                                        <div className={cn(
                                            "flex items-center gap-2", isCurrentUser ? "justify-end": "justify-start"
                                            )}>
                                            { !isCurrentUser && <UserAvatar name="Jane Doe" imageUrl="https://github.com/shadcn.png"/> }
                                            <div className={cn(
                                                "max-w-[70%] rounded-lg p-3",
                                                isCurrentUser ? "bg-primary/10 text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                            )}>
                                                <p className="text-sm text-foreground">{message.content} </p>
                                                <p className="text-xs text-foreground opacity-50 mt-1">{message.createdAt.toLocaleTimeString()}</p>
                                            </div>
                                            <div>
                                                {isCurrentUser && (
                                                    <UserAvatar name="John Doe" imageUrl="https://github.com/shadcn.png"/>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }) 
                            }
                    </CardContent>
                    <CardFooter className="border-t p-4">
                        <div className="flex gap-2 w-full items-center">
                            <Textarea className="resize-none" rows={2} placeholder="Type your message" value={""} 
                            onKeyDown={(e) => {
                                if(e.key === "Enter" && !e.shiftKey){
                                    e.preventDefault();
                                    console.log("Send Message")
                                }
                            }}
                            onChange={() => {}}/>
                            <Button>Send</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="col-span-1">
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Conversation Summary</CardTitle>
                            <Button>Generate</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        Summary
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}