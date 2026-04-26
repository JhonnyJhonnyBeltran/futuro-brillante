import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import OfflineScreen from "./components/OfflineScreen";
import { useOnlineStatus } from "./hooks/use-online-status";

const Index = lazy(() => import("./pages/Index.tsx"));
const Quiz = lazy(() => import("./pages/Quiz.tsx"));
const Loading = lazy(() => import("./pages/Loading.tsx"));
const Results = lazy(() => import("./pages/Results.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  const isOnline = useOnlineStatus();
  if (!isOnline) return <OfflineScreen />;
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={(
            <div className="mobile-shell flex items-center justify-center px-4">
              <p className="text-sm font-semibold text-muted-foreground">Cargando experiencia...</p>
            </div>
          )}
        >
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
