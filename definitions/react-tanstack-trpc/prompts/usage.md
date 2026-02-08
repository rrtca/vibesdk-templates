## Stack

- **Frontend**: React 18 + TanStack Router (file-based routing in `src/routes/`) + TanStack Query
- **Backend**: Cloudflare Worker with tRPC (`worker/router.ts`)
- **Database**: D1 (SQLite) via `env.DB` binding
- **Styling**: Tailwind CSS + shadcn/ui components in `src/components/ui/`
- **Themes**: 3 color themes (Slate, Terminal Green, Commodore 64) + dark/light mode

## Key Files

- `worker/router.ts` -- tRPC router. Add procedures here (queries and mutations).
- `worker/context.ts` -- tRPC context. Exposes `env.DB` to all procedures.
- `worker/index.ts` -- Worker entry. Routes `/api/trpc/*` to tRPC, everything else to static assets.
- `src/lib/trpc.ts` -- tRPC React client. Import `trpc` from here to use typed hooks.
- `src/routes/__root.tsx` -- Root layout with providers (QueryClient, ThemeProvider, tRPC).
- `src/routes/index.tsx` -- Home page. Add your main content here.
- `wrangler.jsonc` -- Cloudflare Worker config with D1 binding.

## Adding a tRPC Procedure

In `worker/router.ts`:
```typescript
items: t.router({
  list: t.procedure.query(async ({ ctx }) => {
    const result = await ctx.db.prepare("SELECT * FROM items").all();
    return result.results;
  }),
  create: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.prepare("INSERT INTO items (title) VALUES (?)").bind(input.title).run();
    }),
}),
```

In a React component:
```typescript
import { trpc } from "@/lib/trpc";

function ItemsList() {
  const { data: items } = trpc.items.list.useQuery();
  const createItem = trpc.items.create.useMutation();
  // ...
}
```

## Adding a Route

Create a new file in `src/routes/`, e.g. `src/routes/about.tsx`:
```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return <div>About</div>;
}
```

TanStack Router auto-generates the route tree from the file system.

## UI Components

50+ shadcn/ui components available in `src/components/ui/`. Use them directly:
```typescript
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
```

Do NOT modify files in `src/components/ui/` -- they are maintained by shadcn/ui.
