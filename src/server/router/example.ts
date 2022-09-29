import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });


export const messageRouter = createRouter()
    .query("getAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.message.findMany({
                take: 10,
                orderBy: {
                    createdAt: "desc",
                }
            });
        }
    }
    )
    .mutation("create", {
        input: z.object({ text: z.string() }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.message.create({
                data: {
                    text: input.text,
                },
            });
        }
    }
    )