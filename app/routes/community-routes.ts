import { db } from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "./middleware/auth-middleware";

type Variables = {
    userId: string;
}

const communitiesApp = new Hono<{Variables: Variables}>()
    .use("/*",authMiddleware)
    .get("/all", async(c) => {
        const allCommunites = await db.select().from(communities);

        return c.json(allCommunites)
    })
    .post("/:communityId/join", async(c) => {
        const user = c.get("user");
        const {communityId} = c.req.param();
        const [existing] = await db.select()
            .from(communityMembers)
            .where(
                and(
                    eq(communityMembers.communityId, communityId), 
                    eq(communityMembers.userId, user.id)
                )
            );

        if(existing) throw new HTTPException(400, {message: "User already community member"});

        await db.insert(communityMembers).values({
            userId:user.id,
            communityId
        })

        return c.json({
            message: "Joined Community Successfully",
        })
    })
    .get("/", async (c) => {
        // const clerkId = c.get("userId");
        // const user = await getOrCreateUserByClerkId(clerkId);
        // // console.log(user)
        
        const user = c.get("user")
        if(!user) return c.json([]);
        
        //fetching all all communities the user is part of         
        const userCommunities = await db.select({
                                    id:communityMembers.id,
                                    userId:communityMembers.userId,
                                    communityId:communityMembers.communityId,
                                    joinedAt:communityMembers.joinedAt,
                                    community: communities,
                            })
                            .from(communityMembers)
                            .innerJoin(communities,eq(communityMembers.communityId,communities.id))
                            .where(eq(communityMembers.userId,user.id));
        
        return c.json(userCommunities);
    })

export {communitiesApp};