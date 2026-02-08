## Stack

- **Frontend**: React 18 + TanStack Router (file-based routing in `src/routes/`) + TanStack Query
- **Backend**: Cloudflare Worker with Hono (`worker/index.ts`)
- **Database**: D1 (SQLite) via `env.DB` binding
- **Styling**: Tailwind CSS + shadcn/ui components in `src/components/ui/`
- **Themes**: 3 color themes (Slate, Terminal Green, Commodore 64) + dark/light mode

## Key Files

- `worker/index.ts` -- Hono app entry. Mounts API routes and serves static assets.
- `worker/routes/items.ts` -- Example API route with D1 queries. Add more route files here.
- `src/lib/api-client.ts` -- Typed fetch wrapper for API calls. Use this from React components.
- `src/routes/__root.tsx` -- Root layout with providers (QueryClient, ThemeProvider).
- `src/routes/index.tsx` -- Home page. Add your main content here.
- `wrangler.jsonc` -- Cloudflare Worker config with D1 binding.

## Adding an API Route

Create a new file in `worker/routes/`, e.g. `worker/routes/users.ts`:
```typescript
import { Hono } from "hono";

type Bindings = { DB: D1Database };

export const users = new Hono<{ Bindings: Bindings }>();

users.get("/", async (c) => {
  const result = await c.env.DB.prepare("SELECT * FROM users").all();
  return c.json(result.results);
});
```

Mount it in `worker/index.ts`:
```typescript
import { users } from "./routes/users";
app.route("/api/users", users);
```

## Data Fetching in React

Use TanStack Query with the API client:
```typescript
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

function UsersList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: api.users.list,
  });
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
