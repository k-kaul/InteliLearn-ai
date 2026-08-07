import { getOrCreateUserByClerkId } from "@/lib/user-utils";
import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

export type User = {
    id: string;
    clerkId: string;
    email: string;
    name: string;
    imageUrl: string | null;
    subscriptionTier: string;
    createdAt: Date;
    updatedAt: Date;
}

type AuthVariables = {
    userId: string,
    user: User
}

export async function authMiddleware( c:Context<{Variables:AuthVariables}>,
    next:Next){
    const clerkId = c.get("userId") as string;
    
    const user = await getOrCreateUserByClerkId(clerkId);

    if(!user) throw new HTTPException(404, { message: "User not found" });

    c.set("user", user);

    return next();
}