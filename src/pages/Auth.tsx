import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import authHero from '@/assets/auth-hero.jpg';
const pacifisaiLogo = '/images/pacifisai.svg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
  <div className="min-h-screen min-w-screen w-full h-full bg-background flex">
      {/* Left Side - Forms */}
  <div className="flex-1 w-full h-full flex flex-col justify-start px-8 py-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            
            <div className="flex flex-col items-center w-full">
              <img 
                src={pacifisaiLogo} 
                alt="PacifisAI Logo" 
                className="w-40 h-20 object-contain mx-auto"
              />
              <p className="text-sm text-muted-foreground text-center mt-2">Empathy-Driven Customer Support</p>
            </div>
          </div>
        </motion.div>

        {/* Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex p-1 mb-8 bg-muted/30 rounded-xl backdrop-blur-sm max-w-md"
        >
          <Button
            variant={isLogin ? "default" : "ghost"}
            className={`flex-1 h-11 rounded-lg font-medium transition-all ${
              isLogin 
                ? "gradient-primary text-primary-foreground shadow-lg" 
                : "hover:bg-muted/50"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </Button>
          <Button
            variant={!isLogin ? "default" : "ghost"}
            className={`flex-1 h-11 rounded-lg font-medium transition-all ${
              !isLogin 
                ? "gradient-success text-success-foreground shadow-lg" 
                : "hover:bg-muted/50"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </Button>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-3">
            {isLogin ? 'Welcome back!' : 'Get started today'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {isLogin 
              ? 'Sign in to access your AI-powered customer support dashboard' 
              : 'Create your account and revolutionize customer support with AI'
            }
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          key={isLogin ? 'login' : 'register'}
          initial={{ opacity: 0, x: isLogin ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLogin ? 30 : -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="max-w-md"
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-md"
        >
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 font-medium transition-colors underline-offset-4 hover:underline"
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>

      {/* Right Side - Hero Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-success/10" />
        <img 
          src={authHero} 
          alt="PacifisAI Dashboard Preview" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-background/80 via-transparent to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-foreground"
          >
            <h3 className="text-2xl font-poppins font-bold mb-3">
              Next-Generation Customer Support
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Empower your team with AI that understands emotions, escalates intelligently, 
              and delivers exceptional customer experiences across all channels.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>96% Customer Satisfaction</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>1.8min Average Response</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-16 h-16 rounded-2xl gradient-primary opacity-20"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-32 w-12 h-12 rounded-xl gradient-success opacity-20"
        />
      </motion.div>
    </div>
  );
};

export default Auth;