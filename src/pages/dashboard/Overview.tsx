import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, CheckCircle, Users, AlertTriangle, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const sentimentData = [
  { month: 'Jan', positive: 85, neutral: 68, negative: 25 },
  { month: 'Feb', positive: 88, neutral: 72, negative: 22 },
  { month: 'Mar', positive: 92, neutral: 75, negative: 18 },
  { month: 'Apr', positive: 89, neutral: 78, negative: 20 },
  { month: 'May', positive: 94, neutral: 82, negative: 15 },
  { month: 'Jun', positive: 96, neutral: 85, negative: 12 },
];

const ticketStatus = [
  { name: 'Resolved', value: 432, color: 'hsl(var(--success))' },
  { name: 'In Progress', value: 89, color: 'hsl(var(--primary))' },
  { name: 'Escalated', value: 23, color: 'hsl(var(--destructive))' },
];

const KPICard = ({ title, value, subtitle, icon: Icon, trend, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className={`glass-card hover-lift ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={trend >= 0 ? "text-success" : "text-destructive"}>
            {trend >= 0 ? "↗" : "↘"} {Math.abs(trend)}%
          </span>
          {" "}{subtitle}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const Overview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-poppins font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your customer support performance and AI effectiveness</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Customer Sentiment"
          value="94.2%"
          subtitle="from last month"
          icon={Heart}
          trend={5.2}
          className="border-l-4 border-l-success"
        />
        <KPICard
          title="Avg Response Time"
          value="2.3min"
          subtitle="faster than target"
          icon={Clock}
          trend={12.5}
          className="border-l-4 border-l-primary"
        />
        <KPICard
          title="Tickets Resolved"
          value="432"
          subtitle="this week"
          icon={CheckCircle}
          trend={8.1}
          className="border-l-4 border-l-success"
        />
        <KPICard
          title="Active Customers"
          value="2,847"
          subtitle="engaging this month"
          icon={Users}
          trend={3.4}
          className="border-l-4 border-l-primary"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sentiment Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Customer Sentiment Trends</span>
              </CardTitle>
              <CardDescription>
                Track emotional responses over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sentimentData}>
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
                    dataKey="positive" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="neutral" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="negative" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ticket Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>Ticket Status Distribution</span>
              </CardTitle>
              <CardDescription>
                Current ticket resolution status
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ticketStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ticketStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent AI Interactions</CardTitle>
            <CardDescription>Latest automated support activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 minutes ago", customer: "Sarah Chen", action: "Resolved billing inquiry", sentiment: "positive" },
                { time: "5 minutes ago", customer: "Mike Johnson", action: "Escalated technical issue", sentiment: "neutral" },
                { time: "8 minutes ago", customer: "Emma Wilson", action: "Provided product guidance", sentiment: "positive" },
                { time: "12 minutes ago", customer: "David Brown", action: "Updated shipping information", sentiment: "positive" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.sentiment === 'positive' ? 'bg-success' : 
                      activity.sentiment === 'neutral' ? 'bg-primary' : 'bg-destructive'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.customer}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;