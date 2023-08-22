import { z } from "zod";
import { useAuth } from '@clerk/nextjs';
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

export const collectionRouter = createTRPCRouter({
    
    getUserCollections: protectedProcedure
 .query(async({ctx})=>{
    const userId = ctx.auth.userId;
    const collections = await ctx.prisma.collection.findMany({
        where: {userId: userId}
    })
return collections
 }),

    
    create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ctx, input})=>{
        
        const existingUser = await ctx.prisma.user.findUnique({
            where: { id: ctx.auth.userId },
        });

      
        if (!existingUser) {
            await ctx.prisma.user.create({
                data: {
                    id: ctx.auth.userId,
                
                   
                }
            });
        } 

        // now we know the user really exist we can create a collection 
        const newCollection = await ctx.prisma.collection.create({
            data:{
                name: input.name, // Nom de la collection provenant de formData
                userId: ctx.auth.userId
            }
        });

        return newCollection;
    }),

   getCollectionById: protectedProcedure
   .input(z.object({id: z.string()}))
   .query(async ({ ctx, input }) => {
    const collection = await ctx.prisma.collection.findUnique({
      where: { id: input.id },
      include: { articles: true }
    });
    return collection
}),
    
});
