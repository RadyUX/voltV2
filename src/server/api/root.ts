import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { collectionRouter } from "./routers/collection";
import { articleRouter } from "./routers/article";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  collection: collectionRouter,
  article: articleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
