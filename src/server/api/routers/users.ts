import { z } from "zod";
import { useAuth } from '@clerk/nextjs';
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

export const collectionRouter = createTRPCRouter({
    
    saveUser: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ctx, input})=>{
            // Vérifiez si l'utilisateur existe
            const existingUser = await ctx.prisma.user.findUnique({
                where: { id: ctx.auth.userId },
            });

            // Si l'utilisateur n'existe pas, créez-le
            if (!existingUser) {
                await ctx.prisma.user.create({
                    data: {
                        id: ctx.auth.userId,
                        // vous pouvez ajouter d'autres champs ici si nécessaire
                    }
                });
            } else {
                // Si vous souhaitez mettre à jour des informations sur un utilisateur existant, vous pouvez le faire ici
            }

            return { success: true }; // retournez une réponse, par exemple une confirmation de succès
        }),
});
