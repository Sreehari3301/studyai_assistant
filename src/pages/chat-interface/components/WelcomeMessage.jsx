import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = ({ userName = "Student" }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const suggestions = [
    {
      id: 1,
      icon: "FileText",
      title: "Summarize my notes",
      description: "Get key points from your study materials"
    },
    {
      id: 2,
      icon: "CreditCard",
      title: "Create flashcards",
      description: "Generate practice cards from any topic"
    },
    {
      id: 3,
      icon: "Target",
      title: "Plan exam strategy",
      description: "Build a personalized study schedule"
    },
    {
      id: 4,
      icon: "HelpCircle",
      title: "Ask a question",
      description: "Get help with homework or concepts"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Brain" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-muted-foreground max-w-md">
          I'm your AI study companion. I can help you create notes, flashcards, study plans, and answer any academic questions you have.
        </p>
      </div>
      {/* Quick Suggestions */}
      <div className="w-full max-w-md space-y-3">
        <h3 className="text-sm font-semibold text-foreground mb-3 text-center">
          Quick suggestions
        </h3>
        {suggestions?.map((suggestion) => (
          <button
            key={suggestion?.id}
            className="w-full p-4 bg-card border border-border rounded-xl hover:bg-muted transition-smooth text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <Icon name={suggestion?.icon} size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {suggestion?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {suggestion?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;