"use client"
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { UserAvatar } from "../ui/user-avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/api-client";
import { useUser } from "@clerk/nextjs";

export function ChatInterface({matchId}: {
    matchId:string;
}){
    const { user:clerkUser } = useUser();
    //fetch the conversation for the match
    const {data: conversation} = useQuery({
        queryKey: ["conversation", matchId],
        queryFn: async () => {
            const res = await client.api.matches[':matchId'].conversation.$get({
                param: {matchId}
            })

            if(!res.ok) throw new Error("Error fetching conversations");

            return res.json();
        }
    })

    //fetch messgaes for the conversation
    const {data:messages} = useQuery({
        queryKey: ["messages", conversation?.id ],
        queryFn: async () => {
            const res = await client.api.conversations[":conversationId"].messages.$get({
                param: {conversationId: conversation?.id ?? ""}
            })

            if(!res.ok) throw new Error("failed to fetch messages");

            return res.json();
        }, 
        refetchInterval: 5000,
    });

    if(!conversation) return <div>Loading...</div>;

    const currentUser = {
        name: (clerkUser?.firstName + " " + clerkUser?.lastName).trim() ?? "You",
        imageUrl: clerkUser?.imageUrl ?? undefined
    }
    
    const otherUser = {
        id: conversation.otherUser.id,
        name: conversation.otherUser.name,
        imageUrl: conversation.otherUser.imageUrl,
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
                <Card className="h-150 flex flex-col">
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                            <UserAvatar 
                                name={currentUser.name}
                                imageUrl={currentUser.imageUrl}
                            />
                            <CardTitle>{currentUser.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                            { messages?.map((message) => {
                                const isCurrentUser = message.senderId === conversation.currentUserId;
                                const user = isCurrentUser ? currentUser ?? "" : conversation.otherUser ?? "";

                            return (
                                    <div key={message.id} className="space-y-4">
                                        <div className={cn(
                                            "flex items-center gap-2", isCurrentUser ? "justify-end": "justify-start"
                                            )}>
                                            { !isCurrentUser && <UserAvatar name={user.name} imageUrl={user.imageUrl}/> }
                                            <div className={cn(
                                                "max-w-[70%] rounded-lg p-3",
                                                isCurrentUser ? "bg-primary/10 text-primary-foreground"
                                                : "bg-muted text-muted-foreground"
                                            )}>
                                                <p className="text-sm text-foreground">{message.content} </p>
                                                <p className="text-xs text-foreground opacity-50 mt-1">{message.createdAt}</p>
                                            </div>
                                            <div>
                                                {isCurrentUser && (
                                                    <UserAvatar name={currentUser.name} imageUrl={currentUser.imageUrl}/>
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