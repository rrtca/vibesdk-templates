import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Welcome
        </h1>
        <p className="text-muted-foreground">
          Start building your app.
        </p>
      </main>
    </div>
  );
}
