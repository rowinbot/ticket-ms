import { Router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query";
import { PageLayout } from "./components/page-layout";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Router />
      </PageLayout>
    </QueryClientProvider>
  );
}
