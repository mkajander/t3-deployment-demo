// src/server/router/index.ts
import {createRouter} from "./context";
import superjson from "superjson";

import {exampleRouter, messageRouter} from "./example";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("message.", messageRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
