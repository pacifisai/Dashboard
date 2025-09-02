import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Clock, MessageSquare, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
  processingTime?: number;
}

const predefinedResponses = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello! I'm your PacifisAI assistant. I'm here to help you with any questions or concerns you might have. How can I assist you today?",
    sentiment: 'positive' as const,
    processingTime: 0.3
  },
  {
    keywords: ['order', 'purchase', 'buy'],
    response: "I'd be happy to help you with your order! Could you please provide me with your order number or the email address associated with your purchase? I'll look up the details for you right away.",
    sentiment: 'positive' as const,
    processingTime: 0.5
  },
  {
    keywords: ['problem', 'issue', 'broken', 'error', 'wrong'],
    response: "I understand you're experiencing an issue, and I want to help resolve this as quickly as possible. Could you please describe what's happening in more detail? I'm here to make sure we get this sorted out for you.",
    sentiment: 'neutral' as const,
    processingTime: 0.4
  },
  {
    keywords: ['refund', 'money back', 'return'],
    response: "I completely understand your concern about getting a refund. Let me help you with the return process. First, I'll need to check your order details. Could you provide your order number? I'll make sure we handle this promptly.",
    sentiment: 'neutral' as const,
    processingTime: 0.6
  },
  {
    keywords: ['angry', 'frustrated', 'terrible', 'awful', 'worst'],
    response: "I sincerely apologize for the frustration you're experiencing. Your concerns are completely valid, and I want to make this right for you immediately. Let me escalate this to ensure you get the resolution you deserve.",
    sentiment: 'negative' as const,
    processingTime: 0.3
  },
  {
    keywords: ['thank', 'thanks', 'great', 'awesome', 'excellent'],
    response: "Thank you so much for your kind words! It's wonderful to hear that we've been able to help you successfully. Your feedback truly means a lot to us. Is there anything else I can assist you with today?",
    sentiment: 'positive' as const,
    processingTime: 0.2
  }
];

const defaultResponse = {
  response: "I understand what you're asking, and I want to make sure I give you the most accurate information. Let me connect you with one of our specialists who can provide detailed assistance with your specific question.",
  sentiment: 'neutral' as const,
  processingTime: 0.4
};

const AIAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hello! I'm your PacifisAI customer support assistant. I'm here to help you with any questions, concerns, or issues you might have. How can I assist you today?",
      timestamp: new Date(),
      sentiment: 'positive',
      processingTime: 0.1
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const responseData of predefinedResponses) {
      if (responseData.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return responseData;
      }
    }
    
    return defaultResponse;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Find appropriate response
    const responseData = findResponse(inputValue);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, responseData.processingTime * 1000));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: responseData.response,
      timestamp: new Date(),
      sentiment: responseData.sentiment,
      processingTime: responseData.processingTime
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  const getSentimentBadge = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'destructive';
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
          <Bot className="h-8 w-8 text-primary" />
          <span>AI Agent Simulation</span>
        </h1>
        <p className="text-muted-foreground">Interactive demo of our empathy-driven customer support AI</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <Card className="glass-card h-[600px] flex flex-col">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">PacifisAI Assistant</CardTitle>
                    <CardDescription>Empathy-driven customer support</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-success border-success">
                  ● Online
                </Badge>
              </div>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'gradient-primary text-primary-foreground'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        
                        <div className={`space-y-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block p-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted/50 text-foreground'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            {message.type === 'ai' && message.sentiment && (
                              <Badge variant={getSentimentBadge(message.sentiment) as any} className="text-xs">
                                {message.sentiment}
                              </Badge>
                            )}
                            {message.type === 'ai' && message.processingTime && (
                              <span className="text-muted-foreground">
                                {message.processingTime}s
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>
            
            {/* Input */}
            <div className="border-t border-border/50 p-4">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 h-12 bg-background/50 border-border/50 focus:border-primary"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-12 px-6 gradient-primary text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Zap className="h-5 w-5 text-primary" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Response Time</div>
                <div className="text-2xl font-bold text-success">0.3s</div>
                <div className="text-xs text-muted-foreground">Average processing time</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Sentiment Analysis</div>
                <div className="text-2xl font-bold text-primary">Active</div>
                <div className="text-xs text-muted-foreground">Real-time emotion detection</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Empathy Score</div>
                <div className="text-2xl font-bold text-success">94%</div>
                <div className="text-xs text-muted-foreground">Current conversation</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Suggested Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "I have a problem with my order",
                "How do I return an item?",
                "I'm really frustrated with this service",
                "Thank you for your great help!"
              ].map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3 whitespace-normal"
                  onClick={() => setInputValue(prompt)}
                >
                  <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAgent;