"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  CheckCircle,
  FileSearch,
  Shield,
  Brain,
  Target,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AIGenerationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Analyzing Client Requirements",
      description: "Processing NovaMed's HCP portal requirements and target audience",
      icon: FileSearch,
      duration: 2000
    },
    {
      id: 2,
      title: "Validating Compliance Requirements",
      description: "Ensuring MLR approval pathways and ISI placement standards",
      icon: Shield,
      duration: 1800
    },
    {
      id: 3,
      title: "Processing Medical Content",
      description: "Analyzing Phase III data and real-world evidence requirements",
      icon: Brain,
      duration: 2200
    },
    {
      id: 4,
      title: "Defining Target HCP Segments",
      description: "Identifying endocrinologists and primary care physicians",
      icon: Target,
      duration: 1500
    },
    {
      id: 5,
      title: "Identifying Content Gaps",
      description: "Flagging missing dosing information and safety data",
      icon: AlertTriangle,
      duration: 1700
    }
  ];

  useEffect(() => {
    if (isComplete) return;

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, steps[currentStep].id]);
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);

      return () => clearTimeout(timer);
    } else {
      // All steps completed
      setIsComplete(true);
    }
  }, [currentStep, isComplete, steps]);

  // Separate useEffect for navigation when complete
  useEffect(() => {
    if (isComplete) {
      const navigationTimer = setTimeout(() => {
        router.push('/demo/preview');
      }, 1500);

      return () => clearTimeout(navigationTimer);
    }
  }, [isComplete, router]);




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/demo/brief" className="text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">AI Brief Generation</h1>
              <Badge className="ml-3 bg-green-100 text-green-800">Demo</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setIsComplete(true)}
              >
                Skip Animation
              </Button>
              <Button variant="outline">
                Exit Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Generation Interface */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="h-10 w-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI is Crafting Your Brief
          </h2>
          <p className="text-xl text-gray-600">
            Our AI is analyzing your inputs and generating a comprehensive creative brief
          </p>
        </div>

        {/* Generation Steps */}
        <Card className="p-8 mb-8">
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                rotate: isComplete ? 0 : 360,
                scale: isComplete ? 1.2 : 1 
              }}
              transition={{ 
                rotate: { duration: 2, repeat: isComplete ? 0 : Infinity, ease: "linear" },
                scale: { duration: 0.3 }
              }}
              className="w-16 h-16 mx-auto mb-4"
            >
              {isComplete ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full" />
              )}
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {isComplete ? "Brief Generation Complete!" : "Generating Your HCP Brief..."}
            </h3>
            <p className="text-gray-600">
              {isComplete 
                ? "Your comprehensive brief is ready. Redirecting to preview..."
                : "Our AI is processing your pharma requirements"
              }
            </p>
          </div>

          {/* Steps Checklist */}
          <div className="max-w-2xl mx-auto space-y-4">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === index && !isCompleted;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200' 
                      : isCurrent
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                    isCompleted 
                      ? 'bg-green-500' 
                      : isCurrent
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : isCurrent ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <step.icon className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium mb-1 ${
                      isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${
                      isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>


      </div>
    </div>
  );
}