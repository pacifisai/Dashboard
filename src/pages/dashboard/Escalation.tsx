import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, Clock, User, ArrowRight, CheckCircle } from 'lucide-react';

const escalationSteps = [
  {
    id: 1,
    title: "AI Initial Response",
    description: "Empathy-driven AI provides immediate support",
    duration: "< 30 seconds",
    status: "active",
    success: 85
  },
  {
    id: 2,
    title: "Complexity Analysis",
    description: "AI evaluates if issue requires human intervention",
    duration: "< 10 seconds",
    status: "processing",
    success: 92
  },
  {
    id: 3,
    title: "Smart Routing",
    description: "Routes to specialized agent based on issue type",
    duration: "< 5 seconds",
    status: "pending",
    success: 98
  },
  {
    id: 4,
    title: "Human Takeover",
    description: "Specialist agent receives full context and history",
    duration: "< 1 minute",
    status: "waiting",
    success: 96
  }
];

const escalationTriggers = [
  { trigger: "Customer frustration detected", weight: "High", color: "destructive" },
  { trigger: "Complex technical issue", weight: "Medium", color: "primary" },
  { trigger: "Account security concerns", weight: "High", color: "destructive" },
  { trigger: "Billing disputes > $100", weight: "Medium", color: "primary" },
  { trigger: "Multiple failed AI attempts", weight: "Low", color: "secondary" },
  { trigger: "VIP customer request", weight: "High", color: "success" },
];

const recentEscalations = [
  {
    id: "ESC-001",
    customer: "Sarah Johnson",
    issue: "Payment processing error",
    aiAttempts: 2,
    escalatedTo: "Technical Specialist",
    timeToEscalation: "3m 24s",
    status: "resolved",
    satisfaction: 4.8
  },
  {
    id: "ESC-002",
    customer: "Mike Chen",
    issue: "Account access locked",
    aiAttempts: 1,
    escalatedTo: "Security Team",
    timeToEscalation: "1m 12s",
    status: "in-progress",
    satisfaction: null
  },
  {
    id: "ESC-003",
    customer: "Emma Wilson",
    issue: "Billing discrepancy",
    aiAttempts: 3,
    escalatedTo: "Billing Specialist",
    timeToEscalation: "5m 45s",
    status: "resolved",
    satisfaction: 4.6
  }
];

const Escalation = () => {
  const getStepStatus = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'processing': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'waiting': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
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
          <TrendingUp className="h-8 w-8 text-primary" />
          <span>Intelligent Escalation</span>
        </h1>
        <p className="text-muted-foreground">Smart routing system that seamlessly transitions from AI to human agents</p>
      </motion.div>

      {/* Escalation Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Escalation Workflow</CardTitle>
            <CardDescription>Intelligent decision tree for seamless AI-to-human handoffs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {escalationSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getStepStatus(step.status)}`}>
                    {step.id}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {step.success}% success rate
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {index < escalationSteps.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Escalation Triggers & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Escalation Triggers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>Escalation Triggers</span>
              </CardTitle>
              <CardDescription>Conditions that automatically escalate to human agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {escalationTriggers.map((trigger, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        trigger.color === 'destructive' ? 'bg-destructive' :
                        trigger.color === 'primary' ? 'bg-primary' :
                        trigger.color === 'success' ? 'bg-success' : 'bg-secondary'
                      }`} />
                      <span className="text-sm font-medium">{trigger.trigger}</span>
                    </div>
                    <Badge 
                      variant={trigger.color as any}
                      className="text-xs"
                    >
                      {trigger.weight}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Escalations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Recent Escalations</span>
              </CardTitle>
              <CardDescription>Latest AI-to-human handoffs and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEscalations.map((escalation, index) => (
                  <motion.div
                    key={escalation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{escalation.customer}</span>
                          <Badge variant="outline" className="text-xs">
                            {escalation.id}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{escalation.issue}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {escalation.status === 'resolved' ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <Clock className="h-4 w-4 text-primary" />
                        )}
                        <Badge 
                          variant={escalation.status === 'resolved' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {escalation.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">AI Attempts:</span> {escalation.aiAttempts}
                      </div>
                      <div>
                        <span className="font-medium">Escalation Time:</span> {escalation.timeToEscalation}
                      </div>
                      <div>
                        <span className="font-medium">Assigned to:</span> {escalation.escalatedTo}
                      </div>
                      <div>
                        <span className="font-medium">Satisfaction:</span> {escalation.satisfaction ? `${escalation.satisfaction}/5` : 'Pending'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-4 md:grid-cols-4"
      >
        {[
          { title: 'Escalation Rate', value: '12%', subtitle: 'of total tickets', color: 'primary' },
          { title: 'Avg Escalation Time', value: '3.2min', subtitle: 'from start to handoff', color: 'success' },
          { title: 'Resolution After Escalation', value: '96%', subtitle: 'successfully resolved', color: 'success' },
          { title: 'Customer Satisfaction', value: '4.7/5', subtitle: 'post-escalation rating', color: 'primary' },
        ].map((metric, index) => (
          <Card key={metric.title} className="glass-card hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default Escalation;