import { db } from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

type Variables = {
    userId: string;
}

const communitiesApp = new Hono<{Variables: Variables}>();

communitiesApp
    .get("/all", async(c) => {
        const allCommunites = await db.select().from(communities);

        return c.json(allCommunites)
    })

    .post("/:communityId/join", async(c) => {
        const clerkId = c.get("userId") as string;
        const {communityId} = c.req.param();    
        
        const [community] = await db.select().from(communities).where(eq(communities.id,communityId));
        
        if(!community) throw new HTTPException(404, { message: "Community not found"});

        await db.insert(communityMembers).values({
            userId:clerkId,
            communityId
        });

        return c.json({
            message: "Joined Community Successfully"
        })
    });

export default communitiesApp ;