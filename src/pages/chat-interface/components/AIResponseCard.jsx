import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIResponseCard = ({ type, title, description, data, onView }) => {
  const navigate = useNavigate();

  const getCardIcon = () => {
    switch (type) {
      case 'notes':
        return 'FileText';
      case 'flashcards':
        return 'CreditCard';
      case 'exam-strategy':
        return 'Target';
      default:
        return 'Lightbulb';
    }
  };

  const getCardColor = () => {
    switch (type) {
      case 'notes':
        return 'bg-blue-50 border-blue-200';
      case 'flashcards':
        return 'bg-green-50 border-green-200';
      case 'exam-strategy':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleViewClick = () => {
    if (onView) {
      onView(data);
    }
    
    // Navigate to respective screens
    switch (type) {
      case 'notes': navigate('/study-notes-management');
        break;
      case 'flashcards': navigate('/flashcards');
        break;
      case 'exam-strategy': navigate('/study-dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`border rounded-xl p-4 ${getCardColor()} transition-smooth hover:shadow-md`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Icon name={getCardIcon()} size={20} className="text-primary" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            {description}
          </p>
          
          {/* Data Preview */}
          {data && (
            <div className="mb-3">
              {type === 'flashcards' && data?.cards && (
                <div className="text-xs text-muted-foreground">
                  {data?.cards?.length} flashcards generated
                </div>
              )}
              {type === 'notes' && data?.summary && (
                <div className="text-xs text-muted-foreground">
                  {data?.summary?.split(' ')?.length} words summary
                </div>
              )}
              {type === 'exam-strategy' && data?.topics && (
                <div className="text-xs text-muted-foreground">
                  {data?.topics?.length} key topics identified
                </div>
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewClick}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
            className="text-xs"
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIResponseCard;