import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Quiz from "./pages/Quiz.tsx";
import Loading from "./pages/Loading.tsx";
import Results from "./pages/Results.tsx";
import NotFound from "./pages/NotFound.tsx";
import OfflineScreen from "./components/OfflineScreen";
import { useOnlineStatus } from "./hooks/use-online-status";

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
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
