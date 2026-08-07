import { ChatInterface } from "@/components/chat/chat-interface";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function ChatPage({
    params
}:{
    params: Promise<{matchId:string}>
}){
    const {matchId} = await params;

    return (
        <div className="page-wrapper">
            <Link href={"/chat"}>
                <Button variant={"outline"}>
                    <ArrowLeftIcon />Back to Conversations
                </Button>
            </Link>
            <ChatInterface conversationId={matchId}/>
        </div>
    )
}