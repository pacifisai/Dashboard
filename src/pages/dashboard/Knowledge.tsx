import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Zap, Clock, TrendingUp, HelpCircle } from 'lucide-react';

const knowledgeCategories = [
  { name: 'Billing & Payments', articles: 47, searches: 234, color: 'primary' },
  { name: 'Technical Support', articles: 62, searches: 189, color: 'success' },
  { name: 'Account Management', articles: 28, searches: 156, color: 'secondary' },
  { name: 'Product Features', articles: 91, searches: 298, color: 'primary' },
  { name: 'Shipping & Returns', articles: 35, searches: 167, color: 'success' },
  { name: 'Getting Started', articles: 19, searches: 89, color: 'secondary' },
];

const popularFAQs = [
  {
    question: "How do I reset my password?",
    category: "Account Management",
    views: 1247,
    aiUses: 89,
    lastUpdated: "2 days ago",
    confidence: 96
  },
  {
    question: "What payment methods do you accept?",
    category: "Billing & Payments",
    views: 1089,
    aiUses: 134,
    lastUpdated: "1 week ago",
    confidence: 98
  },
  {
    question: "How do I track my order?",
    category: "Shipping & Returns",
    views: 956,
    aiUses: 78,
    lastUpdated: "3 days ago",
    confidence: 94
  },
  {
    question: "Can I upgrade my subscription?",
    category: "Billing & Payments",
    views: 743,
    aiUses: 65,
    lastUpdated: "1 day ago",
    confidence: 92
  },
  {
    question: "How do I cancel my account?",
    category: "Account Management",
    views: 567,
    aiUses: 43,
    lastUpdated: "5 days ago",
    confidence: 89
  }
];

const instantAnswers = [
  {
    query: "How to change email address",
    answer: "To change your email address: 1) Go to Account Settings, 2) Click 'Edit Profile', 3) Update email field, 4) Verify new email",
    sources: 2,
    confidence: 94,
    responseTime: "0.3s"
  },
  {
    query: "Refund policy duration",
    answer: "We offer a 30-day money-back guarantee on all purchases. Refunds are processed within 5-7 business days.",
    sources: 1,
    confidence: 98,
    responseTime: "0.2s"
  },
  {
    query: "API rate limits",
    answer: "Standard plans include 1000 API calls per hour. Premium plans offer 10,000 calls per hour with burst capacity.",
    sources: 3,
    confidence: 96,
    responseTime: "0.4s"
  }
];

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-2"
      >
        <h1 className="text-3xl font-poppins font-bold text-foreground flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <span>Knowledge Base Assistance</span>
        </h1>
        <p className="text-muted-foreground">AI-powered knowledge base with instant answer suggestions</p>
      </motion.div>

      {/* Search Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Intelligent Search Demo</span>
            </CardTitle>
            <CardDescription>Try searching for customer support topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search knowledge base (e.g., 'how to reset password', 'refund policy')..."
                className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Instant Answers */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Instant AI Answers</h3>
              {instantAnswers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-primary">"{answer.query}"</span>
                        <Badge variant="outline" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          {answer.responseTime}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground">{answer.answer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{answer.sources} sources</span>
                    <span>{answer.confidence}% confidence</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Knowledge Categories & Popular FAQs */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Knowledge Categories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Knowledge Categories</CardTitle>
              <CardDescription>Article collections organized by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {knowledgeCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        category.color === 'primary' ? 'bg-primary' :
                        category.color === 'success' ? 'bg-success' : 'bg-secondary'
                      }`} />
                      <div>
                        <div className="font-medium text-sm">{category.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.articles} articles
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.searches}</div>
                      <div className="text-xs text-muted-foreground">searches</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular FAQs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>Popular FAQs</span>
              </CardTitle>
              <CardDescription>Most accessed questions and AI usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground mb-1">
                          {faq.question}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-success font-medium">
                        {faq.confidence}%
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Views:</span> {faq.views}
                      </div>
                      <div>
                        <span className="font-medium">AI Uses:</span> {faq.aiUses}
                      </div>
                      <div>
                        <span className="font-medium">Updated:</span> {faq.lastUpdated}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Knowledge Base Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid gap-4 md:grid-cols-4"
      >
        {[
          { title: 'Knowledge Articles', value: '342', subtitle: 'total articles', icon: BookOpen },
          { title: 'AI Answer Rate', value: '94%', subtitle: 'questions answered', icon: Zap },
          { title: 'Avg Response Time', value: '0.3s', subtitle: 'instant answers', icon: Clock },
          { title: 'User Satisfaction', value: '4.6/5', subtitle: 'knowledge rating', icon: TrendingUp },
        ].map((metric, index) => (
          <Card key={metric.title} className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
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

export default Knowledge;