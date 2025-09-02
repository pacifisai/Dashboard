import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, Twitter, Phone, Globe, Zap, Clock, TrendingUp } from 'lucide-react';

const channels = [
  {
    name: 'Live Chat',
    icon: MessageSquare,
    status: 'active',
    tickets: 432,
    avgResponse: '1.2min',
    satisfaction: 4.8,
    color: 'success',
    growth: '+12%'
  },
  {
    name: 'Email Support',
    icon: Mail,
    status: 'active',
    tickets: 289,
    avgResponse: '2.4min',
    satisfaction: 4.6,
    color: 'primary',
    growth: '+8%'
  },
  {
    name: 'Social Media',
    icon: Twitter,
    status: 'active',
    tickets: 156,
    avgResponse: '45s',
    satisfaction: 4.7,
    color: 'success',
    growth: '+15%'
  },
  {
    name: 'Phone Support',
    icon: Phone,
    status: 'limited',
    tickets: 98,
    avgResponse: '3.1min',
    satisfaction: 4.5,
    color: 'secondary',
    growth: '+3%'
  },
];

const recentActivity = [
  {
    channel: 'Chat',
    customer: 'Alice Johnson',
    message: 'Need help with my recent order',
    time: '2 min ago',
    status: 'ai-handling',
    sentiment: 'neutral'
  },
  {
    channel: 'Email',
    customer: 'Bob Smith',
    message: 'Billing question about subscription',
    time: '5 min ago',
    status: 'escalated',
    sentiment: 'confused'
  },
  {
    channel: 'Twitter',
    customer: '@customer123',
    message: 'Great service, thanks for the quick help!',
    time: '8 min ago',
    status: 'resolved',
    sentiment: 'positive'
  },
  {
    channel: 'Chat',
    customer: 'Carol Williams',
    message: 'This is frustrating, third time contacting',
    time: '12 min ago',
    status: 'escalated',
    sentiment: 'frustrated'
  },
];

const integrations = [
  { name: 'Slack', status: 'connected', lastSync: '2 min ago' },
  { name: 'Discord', status: 'connected', lastSync: '5 min ago' },
  { name: 'WhatsApp', status: 'pending', lastSync: 'Never' },
  { name: 'Facebook Messenger', status: 'connected', lastSync: '1 min ago' },
  { name: 'Instagram DMs', status: 'connected', lastSync: '3 min ago' },
  { name: 'Telegram', status: 'disconnected', lastSync: '2 days ago' },
];

const MultiChannel = () => {
  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'chat': return MessageSquare;
      case 'email': return Mail;
      case 'twitter': return Twitter;
      case 'phone': return Phone;
      default: return MessageSquare;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'frustrated': return 'text-destructive';
      case 'confused': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ai-handling': return 'primary';
      case 'escalated': return 'destructive';
      case 'resolved': return 'success';
      default: return 'secondary';
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
          <Globe className="h-8 w-8 text-primary" />
          <span>Multi-Channel Integration</span>
        </h1>
        <p className="text-muted-foreground">Unified customer support across all communication channels</p>
      </motion.div>

      {/* Channel Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {channels.map((channel, index) => {
          const IconComponent = channel.icon;
          return (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium">{channel.name}</CardTitle>
                  </div>
                  <Badge 
                    variant={channel.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {channel.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{channel.tickets}</div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Response:</span>
                      <div className="font-medium">{channel.avgResponse}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="font-medium text-success">{channel.satisfaction}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">This week</span>
                    <span className="text-xs text-success">{channel.growth}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Real-time Activity & Integrations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Real-time Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Real-time Activity</span>
              </CardTitle>
              <CardDescription>Live customer interactions across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getChannelIcon(activity.channel);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{activity.customer}</span>
                          <Badge 
                            variant={getStatusColor(activity.status) as any}
                            className="text-xs"
                          >
                            {activity.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{activity.message}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.time}
                          </span>
                          <span className={`text-xs capitalize ${getSentimentColor(activity.sentiment)}`}>
                            {activity.sentiment}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Integrations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Platform Integrations</span>
              </CardTitle>
              <CardDescription>Connected messaging platforms and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        integration.status === 'connected' ? 'bg-success' :
                        integration.status === 'pending' ? 'bg-primary' : 'bg-destructive'
                      }`} />
                      <span className="font-medium text-sm">{integration.name}</span>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          integration.status === 'connected' ? 'default' :
                          integration.status === 'pending' ? 'secondary' : 'destructive'
                        }
                        className="text-xs mb-1"
                      >
                        {integration.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {integration.lastSync}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Channel Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>Unified Response Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">98.5%</div>
            <p className="text-sm text-muted-foreground">
              Cross-channel consistency in AI response quality and speed
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              <span>Average Handle Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">1.8min</div>
            <p className="text-sm text-muted-foreground">
              Consistent across all integrated communication channels
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <MessageSquare className="h-5 w-5 text-success" />
              <span>Total Conversations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">2,847</div>
            <p className="text-sm text-muted-foreground">
              Active conversations managed across all platforms
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MultiChannel;