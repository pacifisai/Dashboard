import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, CheckCircle, Clock, User, MessageSquare, TrendingUp } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'escalation',
    title: 'High Priority Escalation',
    message: 'Customer Sarah Johnson requires immediate attention for billing dispute',
    time: '2 minutes ago',
    priority: 'high',
    read: false,
    customer: 'Sarah Johnson',
    ticketId: 'TKT-2024-001'
  },
  {
    id: 2,
    type: 'sentiment',
    title: 'Negative Sentiment Detected',
    message: 'AI detected frustrated customer in chat conversation',
    time: '5 minutes ago',
    priority: 'medium',
    read: false,
    customer: 'Mike Chen',
    ticketId: 'TKT-2024-002'
  },
  {
    id: 3,
    type: 'resolution',
    title: 'Ticket Resolved Successfully',
    message: 'AI successfully resolved customer inquiry about product features',
    time: '8 minutes ago',
    priority: 'low',
    read: true,
    customer: 'Emma Wilson',
    ticketId: 'TKT-2024-003'
  },
  {
    id: 4,
    type: 'threshold',
    title: 'Response Time Threshold',
    message: 'Response time exceeded 3 minutes for ongoing conversation',
    time: '12 minutes ago',
    priority: 'medium',
    read: false,
    customer: 'David Brown',
    ticketId: 'TKT-2024-004'
  },
  {
    id: 5,
    type: 'feedback',
    title: 'Positive Customer Feedback',
    message: 'Customer rated support interaction 5/5 stars',
    time: '15 minutes ago',
    priority: 'low',
    read: true,
    customer: 'Alice Green',
    ticketId: 'TKT-2024-005'
  }
];

const alertTypes = [
  {
    type: 'escalation',
    name: 'Escalation Alerts',
    description: 'When tickets are escalated to human agents',
    count: 23,
    enabled: true,
    color: 'destructive'
  },
  {
    type: 'sentiment',
    name: 'Sentiment Warnings',
    description: 'Negative customer emotions detected',
    count: 12,
    enabled: true,
    color: 'primary'
  },
  {
    type: 'threshold',
    name: 'Performance Thresholds',
    description: 'Response time or resolution targets exceeded',
    count: 8,
    enabled: true,
    color: 'secondary'
  },
  {
    type: 'feedback',
    name: 'Customer Feedback',
    description: 'Positive and negative customer ratings',
    count: 45,
    enabled: false,
    color: 'success'
  }
];

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'escalation': return AlertTriangle;
      case 'sentiment': return MessageSquare;
      case 'resolution': return CheckCircle;
      case 'threshold': return Clock;
      case 'feedback': return User;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'primary';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const filteredNotifications = selectedFilter === 'all' 
    ? notificationList 
    : notificationList.filter(notif => notif.type === selectedFilter);

  const unreadCount = notificationList.filter(notif => !notif.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-poppins font-bold text-foreground flex items-center space-x-3">
          <Bell className="h-8 w-8 text-primary" />
          <span>Notifications Center</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {unreadCount} unread
            </Badge>
          )}
        </h1>
        <p className="text-muted-foreground">Real-time alerts and notifications for customer support activities</p>
      </motion.div>

      {/* Alert Type Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {alertTypes.map((alertType, index) => (
          <Card 
            key={alertType.type} 
            className={`glass-card hover-lift cursor-pointer ${
              selectedFilter === alertType.type ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedFilter(alertType.type)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{alertType.name}</CardTitle>
                <Badge 
                  variant={alertType.enabled ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {alertType.enabled ? 'On' : 'Off'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{alertType.count}</div>
              <p className="text-xs text-muted-foreground">{alertType.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedFilter('all')}
          className={selectedFilter === 'all' ? 'gradient-primary text-primary-foreground' : ''}
        >
          All Notifications
        </Button>
        {alertTypes.map((type) => (
          <Button
            key={type.type}
            variant={selectedFilter === type.type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(type.type)}
            className={selectedFilter === type.type ? 'gradient-primary text-primary-foreground' : ''}
          >
            {type.name}
          </Button>
        ))}
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Notifications</span>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.map((notification, index) => {
                const IconComponent = getNotificationIcon(notification.type);
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      notification.read 
                        ? 'border-border/50 bg-muted/10' 
                        : 'border-primary/30 bg-primary/5 hover:bg-primary/10'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.read ? 'bg-muted' : 'bg-primary/20'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          notification.read ? 'text-muted-foreground' : 'text-primary'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium text-sm ${
                            notification.read ? 'text-muted-foreground' : 'text-foreground'
                          }`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={getPriorityColor(notification.priority) as any}
                              className="text-xs"
                            >
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time}
                          </span>
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {notification.customer}
                          </span>
                          <span className="font-mono">
                            {notification.ticketId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {filteredNotifications.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications found for this filter</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
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
              <span>Today's Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">47</div>
            <p className="text-sm text-muted-foreground">
              Total notifications sent today
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">12</div>
            <p className="text-sm text-muted-foreground">
              Alerts requiring attention
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="h-5 w-5 text-success" />
              <span>Avg Response Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">2.3min</div>
            <p className="text-sm text-muted-foreground">
              Average time to acknowledge alerts
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Notifications;