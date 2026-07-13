import { db } from "@/db";
import { communities } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { Hono,  } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";

type Variables = {
    userId: string;
}

const app = new Hono<{Variables: Variables}>().basePath("/api"); //request context "Variables" containig userId 

app.onError((err, c) => {
    console.error(err);
    return c.json({
        error: err
    },500)
})

app.use("/*", async (c, next) => {
    const publicRoutes = ['/api/communities/all'];
    
    if(publicRoutes.includes(c.req.path)){
        console.log(c.req.path)
        return await next();
    }

    const session = await auth();
    
    if(!session.userId){
        throw new HTTPException(401, {
            message: "Unauthorized"
        })
    }

    c.set("userId",session.userId);

    return await next();
})

app.get("/communities/all", async(c) => {
    const allCommunites = await db.select().from(communities);

    return c.json(allCommunites)
})

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);