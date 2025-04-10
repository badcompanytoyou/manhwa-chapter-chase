
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManhwaProvider } from "./context/ManhwaContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ReadingList from "./pages/ReadingList";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import ManhwaDetail from "./pages/ManhwaDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ManhwaProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/reading-list" element={<ReadingList />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/manhwa/:id" element={<ManhwaDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ManhwaProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
