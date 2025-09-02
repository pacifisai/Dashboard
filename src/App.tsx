import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import EmpathyAI from "./pages/dashboard/EmpathyAI";
import Escalation from "./pages/dashboard/Escalation";
import MultiChannel from "./pages/dashboard/MultiChannel";
import Knowledge from "./pages/dashboard/Knowledge";
import Analytics from "./pages/dashboard/Analytics";
import Notifications from "./pages/dashboard/Notifications";
import AIAgent from "./pages/dashboard/AIAgent";
import Feedback from "./pages/dashboard/Feedback";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Overview />} />
              <Route path="empathy" element={<EmpathyAI />} />
              <Route path="escalation" element={<Escalation />} />
              <Route path="multichannel" element={<MultiChannel />} />
              <Route path="knowledge" element={<Knowledge />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="ai-agent" element={<AIAgent />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
