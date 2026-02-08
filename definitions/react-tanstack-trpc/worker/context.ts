export function createContext(env: Env) {
  return {
    db: env.DB,
  };
}

export type Context = ReturnType<typeof createContext>;
