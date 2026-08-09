import { Hono } from "hono";
import { Variables } from "./conversation-routes";
import { authMiddleware } from "./middleware/auth-middleware";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";

type AuthVariables = {
    userId: string;
    user:NonNullable<Awaited<ReturnType<typeof getOrCreateUserByClerkId>>>
};

const usersApp = new Hono<{Variables:AuthVariables}>()
    .use("/*", authMiddleware)
    .get("/me", async (c) => {
        const user = c.get("user");
        return c.json(user);
    });

export {usersApp}