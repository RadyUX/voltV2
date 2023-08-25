import { z } from "zod";
import { useAuth } from '@clerk/nextjs';
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { create } from "domain";

export const articleRouter = createTRPCRouter({
    
    getUserArticle: protectedProcedure
 .query(async({ctx})=>{
    const userId = ctx.auth.userId;
    const articles = await ctx.prisma.article.findMany({
        where: { 
            collection: { userId: userId }
          },
        orderBy: {
            createdAt: 'desc'      // Supposition: votre modèle Article a un champ "createdAt"
        },
        take: 6
    })
return articles
 }),


 create: protectedProcedure
 .input(z.object({
    title: z.string(), 
    url: z.string(),  
    imageUrl: z.string(),
    collectionId: z.string()
 }))
 .mutation(async ({ctx, input})=>{
    
    const existingCollection = await ctx.prisma.collection.findUnique({
        where: { id: input.collectionId },
    });

    const newArticle = await ctx.prisma.article.create({
        data:  {
            title: input.title,
            url: input.url,
            imageUrl: input.imageUrl,
            collectionId: input.collectionId
        }
    })
    return newArticle
}),

delete: protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const articleExists = await ctx.prisma.article.findUnique({
      where: {
        id: input,
      }
    });

    if (!articleExists) {
      throw new Error("Article not found");
    }

    return ctx.prisma.article.delete({
      where: {
        id: input,
      }
    });
  })


    
});
