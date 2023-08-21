import { z } from "zod";
import { useAuth } from '@clerk/nextjs';
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

export const articleRouter = createTRPCRouter({
    
    getUserArticle: protectedProcedure
 .query(async({ctx})=>{
    const userId = ctx.auth.userId;
    const articles = await ctx.prisma.article.findMany({
        where: {userId: userId}
    })
return articles
 })

    
});
