import { db } from "@/db";
import { communities, communityMembers, learningGoals } from "@/db/schema";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

type Variables = {
    userId: string;
}

const communitiesApp = new Hono<{Variables: Variables}>()
    .get("/all", async(c) => {
        const allCommunites = await db.select().from(communities);

        return c.json(allCommunites)
    })
    .post("/:communityId/join", async(c) => {
        const clerkId = c.get("userId") as string;
        const {communityId} = c.req.param();    
        
        const user = await getOrCreateUserByClerkId(clerkId);

        if(!user) throw new HTTPException(404, { message: "User not found" });

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
        const clerkId = c.get("userId");
        const user = await getOrCreateUserByClerkId(clerkId);
        // console.log(user)
        
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
                // console.log(userCommunities)
        
        return c.json(userCommunities);
    })
    
    .get("/:communityId/goals", async(c) => {
        const clerkId = c.get("userId");
        const communityId = c.req.param("communityId");

        const user = await getOrCreateUserByClerkId(clerkId);
        if(!user) throw new HTTPException(404, { message: "User not found" });

        const goals = await db
            .select()
            .from(learningGoals)
            .where(
                and(
                    eq(learningGoals.userId, user.id),
                    eq(learningGoals.communityId, communityId)
                )
            )

            return c.json(goals)
    })

export {communitiesApp} ;