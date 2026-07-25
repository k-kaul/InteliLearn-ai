import { db } from "@/db";
import { learningGoals } from "@/db/schema";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";
import { and, eq } from "drizzle-orm";
import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z, ZodType }from "zod";

type Variables = {
    userId: string;
}

async function validateBody<T>(c: Context, schema: ZodType<T>):Promise<T>{
    const body = await c.req.json();
    const response = schema.safeParse(body);

    if(!response.success){
        const errors = response.error.issues.map((err) => ({
            field:err.path.join("."),
            message: err.message
        }))
        throw new HTTPException(400, { 
            message: errors.length === 1 ? errors[0].message : `Validation failed: ${errors.map((e) => e.message).join(".")}`
        });
    } 

    return response.data;
}

const createGoalSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1),
    tags: z.array(z.string()).optional(),
    communityId: z.string().min(1, "Community Id is required")
})

const learningGoalsApp = new Hono<{Variables: Variables}>()
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
    .post("/goals", async(c) => {
        const clerkId = c.get("userId") as string;
        
        const body = await validateBody(c, createGoalSchema);

        const user = await getOrCreateUserByClerkId(clerkId);

        if(!user) throw new HTTPException(404, { message: "User not found" });

        const [goal] = await db
            .insert(learningGoals)
            .values({
                userId:user.id,
                communityId: body.communityId,
                title: body.title,
                description: body.description,
                tags: body.tags || [],
            })
            .returning();

            return c.json(goal)
    })

export {learningGoalsApp}