import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import BlogApp from "./pages/BlogApp";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <BlogApp />
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
