import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Clock, Target, Zap } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';

// Mock analytics data
const performanceData = [
  { month: 'Jan', resolutionRate: 85, avgResponseTime: 3.2, customerSatisfaction: 4.1 },
  { month: 'Feb', resolutionRate: 88, avgResponseTime: 2.9, customerSatisfaction: 4.3 },
  { month: 'Mar', resolutionRate: 92, avgResponseTime: 2.4, customerSatisfaction: 4.5 },
  { month: 'Apr', resolutionRate: 89, avgResponseTime: 2.7, customerSatisfaction: 4.2 },
  { month: 'May', resolutionRate: 94, avgResponseTime: 2.1, customerSatisfaction: 4.6 },
  { month: 'Jun', resolutionRate: 96, avgResponseTime: 1.8, customerSatisfaction: 4.8 },
];

const channelData = [
  { channel: 'Live Chat', tickets: 432, satisfaction: 4.7 },
  { channel: 'Email', tickets: 289, satisfaction: 4.3 },
  { channel: 'Social Media', tickets: 156, satisfaction: 4.5 },
  { channel: 'Phone', tickets: 98, satisfaction: 4.4 },
];

const sentimentTrend = [
  { date: '2024-01-01', positive: 82, neutral: 65, negative: 23 },
  { date: '2024-01-15', positive: 85, neutral: 68, negative: 20 },
  { date: '2024-02-01', positive: 88, neutral: 72, negative: 18 },
  { date: '2024-02-15', positive: 91, neutral: 75, negative: 15 },
  { date: '2024-03-01', positive: 94, neutral: 78, negative: 12 },
  { date: '2024-03-15', positive: 96, neutral: 82, negative: 10 },
];

const agentEfficiency = [
  { agent: 'AI Agent', handled: 1250, avgTime: '1.2 min', satisfaction: 4.8, color: 'hsl(var(--primary))' },
  { agent: 'Sarah Chen', handled: 89, avgTime: '4.5 min', satisfaction: 4.6, color: 'hsl(var(--success))' },
  { agent: 'Mike Johnson', handled: 76, avgTime: '5.2 min', satisfaction: 4.4, color: 'hsl(var(--secondary))' },
  { agent: 'Emma Wilson', handled: 68, avgTime: '4.8 min', satisfaction: 4.5, color: 'hsl(var(--accent))' },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-poppins font-bold text-foreground flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <span>Analytics Dashboard</span>
        </h1>
        <p className="text-muted-foreground">Comprehensive insights into your AI-powered customer support performance</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Resolution Rate', value: '96%', change: '+8%', icon: Target, color: 'success' },
          { title: 'Avg Response Time', value: '1.8min', change: '-15s', icon: Clock, color: 'primary' },
          { title: 'Customer Satisfaction', value: '4.8/5', change: '+0.3', icon: Users, color: 'success' },
          { title: 'AI Efficiency', value: '94%', change: '+12%', icon: Zap, color: 'primary' },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`text-${metric.color}`}>{metric.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Track key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="resolutionRate" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Resolution Rate %"
                />
                <Line 
                  type="monotone" 
                  dataKey="customerSatisfaction" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Customer Satisfaction"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Channel Performance & Sentiment Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Support channel effectiveness comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="channel" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="tickets" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Sentiment Analysis Trend</CardTitle>
              <CardDescription>Customer emotion patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sentimentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="positive" 
                    stackId="1"
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="neutral" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="negative" 
                    stackId="1"
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Agent Efficiency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Agent Efficiency Comparison</CardTitle>
            <CardDescription>Performance metrics across AI and human agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentEfficiency.map((agent, index) => (
                <div key={agent.agent} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: agent.color }}
                    />
                    <div>
                      <div className="font-medium flex items-center space-x-2">
                        <span>{agent.agent}</span>
                        {agent.agent === 'AI Agent' && (
                          <Badge variant="secondary" className="text-xs">AI</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {agent.handled} tickets handled
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{agent.avgTime}</div>
                      <div className="text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-success">{agent.satisfaction}</div>
                      <div className="text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;