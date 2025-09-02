import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Brain, Zap, RefreshCw } from 'lucide-react';

const sentimentExamples = [
  {
    id: 1,
    customer: "Frustrated Customer",
    message: "This is the third time I'm contacting you about my order! It's been 2 weeks and still nothing!",
    sentiment: "angry",
    aiResponse: "I completely understand your frustration, and I sincerely apologize for the delay with your order. Having to reach out multiple times must be incredibly frustrating. Let me personally ensure we resolve this immediately and provide you with a tracking update within the next hour.",
    empathyScore: 92,
    tone: "Apologetic & Proactive"
  },
  {
    id: 2,
    customer: "Confused User",
    message: "I don't understand how to use this new feature. The interface is confusing and I'm lost.",
    sentiment: "confused",
    aiResponse: "I can see how the new interface might feel overwhelming at first - you're definitely not alone in feeling this way. Let me walk you through it step by step with some simple screenshots to make it much clearer for you.",
    empathyScore: 88,
    tone: "Reassuring & Patient"
  },
  {
    id: 3,
    customer: "Happy Customer",
    message: "Just wanted to say thanks for the amazing support! You guys are the best!",
    sentiment: "positive",
    aiResponse: "Your kind words absolutely made our day! It's wonderful to hear that we've been able to help you successfully. Thank you for taking the time to share this feedback - it means the world to our team!",
    empathyScore: 95,
    tone: "Grateful & Warm"
  }
];

const EmpathyAI = () => {
  const [selectedExample, setSelectedExample] = useState(sentimentExamples[0]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'angry': return 'destructive';
      case 'confused': return 'primary';
      case 'positive': return 'success';
      default: return 'secondary';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'angry': return '😤';
      case 'confused': return '😕';
      case 'positive': return '😊';
      default: return '😐';
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
          <Heart className="h-8 w-8 text-primary" />
          <span>Empathy-Driven AI Responses</span>
        </h1>
        <p className="text-muted-foreground">AI that understands emotions and responds with genuine empathy</p>
      </motion.div>

      {/* Main Demo Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Example Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Customer Scenarios</CardTitle>
              <CardDescription>Select a scenario to see empathetic AI responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentimentExamples.map((example) => (
                <motion.div
                  key={example.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedExample.id === example.id ? "default" : "outline"}
                    className={`w-full justify-start h-auto p-4 ${
                      selectedExample.id === example.id ? "gradient-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => setSelectedExample(example)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getSentimentIcon(example.sentiment)}</span>
                      <div className="text-left">
                        <div className="font-medium">{example.customer}</div>
                        <div className="text-xs opacity-80 capitalize">{example.sentiment} tone</div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversation Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <CardTitle>AI Response Demo</CardTitle>
                </div>
                <Badge variant={getSentimentColor(selectedExample.sentiment) as any} className="capitalize">
                  {getSentimentIcon(selectedExample.sentiment)} {selectedExample.sentiment}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Message */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Customer Message:</div>
                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-l-destructive">
                  <p className="text-foreground">{selectedExample.message}</p>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Sentiment Analysis</div>
                  <div className="text-xs text-muted-foreground capitalize">{selectedExample.sentiment}</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Zap className="h-6 w-6 text-success mx-auto mb-2" />
                  <div className="text-sm font-medium">Empathy Score</div>
                  <div className="text-xs text-muted-foreground">{selectedExample.empathyScore}%</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Response Tone</div>
                  <div className="text-xs text-muted-foreground">{selectedExample.tone}</div>
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Empathetic AI Response:</div>
                <div className="p-4 bg-success/10 rounded-lg border-l-4 border-l-success">
                  <p className="text-foreground">{selectedExample.aiResponse}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button className="gradient-primary text-primary-foreground">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Alternative Response
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Brain className="h-5 w-5 text-primary" />
              <span>Emotion Detection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Advanced NLP analyzes customer tone, urgency, and emotional state to craft appropriate responses.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Heart className="h-5 w-5 text-success" />
              <span>Empathy Scoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Every response is scored for empathy level to ensure customers feel heard and understood.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Zap className="h-5 w-5 text-primary" />
              <span>Adaptive Tone</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Automatically adjusts communication style based on customer sentiment and interaction history.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmpathyAI;