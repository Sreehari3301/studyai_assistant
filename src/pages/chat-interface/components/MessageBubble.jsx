import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ message, isUser = false }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] sm:max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar for AI messages */}
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
              <Icon name="Brain" size={16} color="white" />
            </div>
            <span className="text-sm font-medium text-foreground">StudyAI</span>
          </div>
        )}
        
        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-white rounded-br-md' :'bg-muted text-foreground rounded-bl-md'
        }`}>
          {/* File Attachment */}
          {message?.attachment && (
            <div className="flex items-center space-x-2 mb-2 p-2 bg-black/10 rounded-lg">
              <Icon 
                name={message?.attachment?.type === 'image' ? 'Image' : 'FileText'} 
                size={16} 
                color={isUser ? 'white' : 'currentColor'}
              />
              <span className="text-sm font-medium truncate">
                {message?.attachment?.name}
              </span>
            </div>
          )}
          
          {/* Text Content */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message?.content}
          </p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-2 ${
            isUser ? 'text-white/70' : 'text-muted-foreground'
          }`}>
            {formatTimestamp(message?.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;