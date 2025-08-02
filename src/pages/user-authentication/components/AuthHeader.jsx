import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Brain" size={28} color="white" />
        </div>
        <span className="ml-3 text-2xl font-bold text-foreground">StudyAI</span>
      </div>
      
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Welcome to StudyAI
      </h1>
      <p className="text-muted-foreground">
        Your AI-powered study companion for academic success
      </p>
    </div>
  );
};

export default AuthHeader;