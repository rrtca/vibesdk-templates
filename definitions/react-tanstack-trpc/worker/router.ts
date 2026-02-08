import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name ?? "world"}!` };
    }),
});

export type AppRouter = typeof appRouter;
