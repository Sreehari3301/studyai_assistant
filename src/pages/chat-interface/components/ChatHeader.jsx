import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onlineStatus = true, lastSeen = null }) => {
  return (
    <div className="border-b border-border bg-card px-4 py-3">
      <div className="flex items-center space-x-3">
        {/* AI Avatar */}
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Brain" size={20} color="white" />
        </div>
        
        {/* AI Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">StudyAI Assistant</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              onlineStatus ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm text-muted-foreground">
              {onlineStatus ? 'Online' : `Last seen ${lastSeen || 'recently'}`}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-smooth">
            <Icon name="MoreVertical" size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;