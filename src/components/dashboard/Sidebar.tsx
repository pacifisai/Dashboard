import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Brain,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Activity,
  Bell,
  Bot,
  Heart,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
const pacifisaiLogo = '/images/pacifisai.svg';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { icon: Home, label: 'Overview', path: '/dashboard' },
  { icon: Heart, label: 'Empathy-Driven AI', path: '/dashboard/empathy' },
  { icon: TrendingUp, label: 'Intelligent Escalation', path: '/dashboard/escalation' },
  { icon: MessageSquare, label: 'Multi-Channel Integration', path: '/dashboard/multichannel' },
  { icon: BookOpen, label: 'Knowledge Base', path: '/dashboard/knowledge' },
  { icon: BarChart3, label: 'Analytics Dashboard', path: '/dashboard/analytics' },
  { icon: Bell, label: 'Notifications Center', path: '/dashboard/notifications' },
  { icon: Bot, label: 'AI Agent Simulation', path: '/dashboard/ai-agent' },
  { icon: Activity, label: 'Customer Feedback', path: '/dashboard/feedback' },
  { icon: Settings, label: 'User Settings', path: '/dashboard/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0 z-40"
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center flex-1"
            >
              <img 
                src={pacifisaiLogo}
                alt="PacifisAI Logo"
                className="w-40 h-20 object-contain"
              />
            </motion.div>
          )}
          
          {isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto"
            >
              <img 
                src={pacifisaiLogo}
                alt="PacifisAI Logo"
                className="w-8 h-8 object-contain"
              />
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8 hover:scale-105 transition-all flex-shrink-0"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <NavLink
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 text-sidebar-primary-foreground shadow-lg transform scale-[1.02]" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive ? "text-sidebar-primary-foreground drop-shadow-sm" : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground group-hover:scale-110"
                )} />
                
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}

                {isActive && !isCollapsed && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute right-2 w-1 h-6 bg-sidebar-primary-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-sidebar-foreground text-sidebar-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-sidebar-foreground rotate-45" />
                  </div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all group",
            isCollapsed ? "px-0 justify-center" : "px-4"
          )}
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
          
          {isCollapsed && (
            <div className="absolute left-full ml-3 px-3 py-2 bg-destructive text-destructive-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Logout
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-destructive rotate-45" />
            </div>
          )}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;