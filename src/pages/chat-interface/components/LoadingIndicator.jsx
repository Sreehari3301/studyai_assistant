import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingIndicator = ({ message = "StudyAI is thinking..." }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] sm:max-w-[70%]">
        {/* AI Avatar */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
            <Icon name="Brain" size={16} color="white" />
          </div>
          <span className="text-sm font-medium text-foreground">StudyAI</span>
        </div>
        
        {/* Loading Bubble */}
        <div className="bg-muted text-foreground rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex items-center space-x-2">
            {/* Pulsing Dots */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;