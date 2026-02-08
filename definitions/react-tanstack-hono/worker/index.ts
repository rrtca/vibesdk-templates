import { Hono } from "hono";
import { cors } from "hono/cors";
import { items } from "./routes/items";

type Bindings = {
  DB: D1Database;
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());

app.route("/api/items", items);

app.get("/api/health", (c) => c.json({ status: "ok" }));

export default app;
