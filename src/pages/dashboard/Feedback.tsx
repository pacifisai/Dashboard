import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Star, TrendingUp, Users, MessageCircle, ThumbsUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

// Mock feedback data
const feedbackDistribution = [
  { name: 'Positive', value: 68, color: 'hsl(var(--success))' },
  { name: 'Neutral', value: 24, color: 'hsl(var(--primary))' },
  { name: 'Negative', value: 8, color: 'hsl(var(--destructive))' },
];

const satisfactionTrend = [
  { month: 'Jan', score: 4.2, responses: 234 },
  { month: 'Feb', score: 4.3, responses: 267 },
  { month: 'Mar', score: 4.5, responses: 298 },
  { month: 'Apr', score: 4.4, responses: 312 },
  { month: 'May', score: 4.6, responses: 345 },
  { month: 'Jun', score: 4.8, responses: 389 },
];

const channelFeedback = [
  { channel: 'Live Chat', rating: 4.8, responses: 234 },
  { channel: 'Email', rating: 4.6, responses: 189 },
  { channel: 'Social Media', rating: 4.7, responses: 156 },
  { channel: 'Phone', rating: 4.5, responses: 98 },
];

const recentFeedback = [
  {
    id: 1,
    customer: 'Sarah Chen',
    rating: 5,
    comment: 'Amazing support! The AI understood my problem immediately and provided exactly what I needed.',
    channel: 'Live Chat',
    time: '2 hours ago',
    category: 'Technical Support',
    sentiment: 'positive'
  },
  {
    id: 2,
    customer: 'Mike Johnson',
    rating: 4,
    comment: 'Good service, though it took a while to get to a human agent when needed.',
    channel: 'Email',
    time: '4 hours ago',
    category: 'Account Issues',
    sentiment: 'positive'
  },
  {
    id: 3,
    customer: 'Emma Wilson',
    rating: 5,
    comment: 'Impressed by how quickly the AI resolved my billing question. Very efficient!',
    channel: 'Live Chat',
    time: '6 hours ago',
    category: 'Billing',
    sentiment: 'positive'
  },
  {
    id: 4,
    customer: 'David Brown',
    rating: 3,
    comment: 'The AI was helpful but I needed more detailed technical information.',
    channel: 'Phone',
    time: '8 hours ago',
    category: 'Technical Support',
    sentiment: 'neutral'
  },
  {
    id: 5,
    customer: 'Lisa Garcia',
    rating: 2,
    comment: 'Had to repeat myself several times before getting the right answer.',
    channel: 'Email',
    time: '10 hours ago',
    category: 'Product Questions',
    sentiment: 'negative'
  }
];

const Feedback = () => {
  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'fill-primary text-primary' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-poppins font-bold text-foreground flex items-center space-x-3">
          <Activity className="h-8 w-8 text-primary" />
          <span>Customer Feedback Insights</span>
        </h1>
        <p className="text-muted-foreground">Comprehensive analysis of customer satisfaction and feedback trends</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Overall Rating', value: '4.8/5', change: '+0.2', icon: Star, color: 'success' },
          { title: 'Response Rate', value: '89%', change: '+5%', icon: MessageCircle, color: 'primary' },
          { title: 'Positive Feedback', value: '68%', change: '+8%', icon: ThumbsUp, color: 'success' },
          { title: 'Total Responses', value: '1,247', change: '+12%', icon: Users, color: 'primary' },
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

      {/* Feedback Distribution & Satisfaction Trend */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Feedback Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Feedback Distribution</CardTitle>
              <CardDescription>Overall customer sentiment breakdown</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={feedbackDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {feedbackDistribution.map((entry, index) => (
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

        {/* Satisfaction Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Satisfaction Trend</span>
              </CardTitle>
              <CardDescription>Customer satisfaction scores over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={satisfactionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    domain={[3.5, 5]} 
                    stroke="hsl(var(--muted-foreground))" 
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Channel Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Customer satisfaction ratings by support channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelFeedback}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="channel" stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  domain={[4, 5]} 
                  stroke="hsl(var(--muted-foreground))" 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="rating" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Customer Feedback</CardTitle>
            <CardDescription>Latest customer reviews and comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium text-sm">{feedback.customer}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {getRatingStars(feedback.rating)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {feedback.channel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{feedback.time}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${getSentimentColor(feedback.sentiment)}`}
                      >
                        {feedback.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground italic">
                    "{feedback.comment}"
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Feedback;