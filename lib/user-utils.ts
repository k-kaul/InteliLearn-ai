import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser, User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

async function createUserFromClerk(clerkUser:User){
    const [user] = await db.insert(users)
                    .values({
                        clerkId: clerkUser.id,
                        email: clerkUser.emailAddresses[0].emailAddress || "",
                        name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim() || "user",
                        imageUrl: clerkUser.imageUrl,
                        updatedAt: new Date(),
                    })
                    .returning()
                    .onConflictDoNothing();
    
    return user;   
}


export async function getOrCreateUserByClerkId(clerkId:string){
    let [user] = await db.select().from(users).where(eq(users.clerkId,clerkId));
    
    if(!user){
        const clerkUser = await currentUser();

        if(!clerkUser) return null;

        const email = clerkUser.emailAddresses[0].emailAddress || '';

        const [existingUser] = await db.select().from(users).where(eq(users.email,email));

        if(existingUser){
            [user] = await db.update(users)
                        .set({
                            clerkId:clerkUser.id,
                            name: `${clerkUser.firstName} ${clerkUser.lastName}` || existingUser.name,
                            imageUrl: clerkUser.imageUrl,
                            updatedAt: new Date(),
                        }).where(eq(users.email, email))
                        .returning()
        }else {        
            user = await createUserFromClerk(clerkUser);        
        }
    }
    return user;
}