import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

export const items = new Hono<{ Bindings: Bindings }>();

items.get("/", async (c) => {
  const result = await c.env.DB.prepare("SELECT * FROM items ORDER BY created_at DESC").all();
  return c.json(result.results);
});

items.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare("SELECT * FROM items WHERE id = ?").bind(id).first();
  if (!result) return c.json({ error: "Not found" }, 404);
  return c.json(result);
});

items.post("/", async (c) => {
  const body = await c.req.json<{ title: string }>();
  const result = await c.env.DB.prepare("INSERT INTO items (title) VALUES (?) RETURNING *")
    .bind(body.title)
    .first();
  return c.json(result, 201);
});
