import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoteCard = ({ note, onToggleFavorite, onEdit, onDelete, onView, className = '' }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getSubjectColor = (subject) => {
    const colors = {
      mathematics: 'bg-blue-100 text-blue-800',
      science: 'bg-green-100 text-green-800',
      english: 'bg-purple-100 text-purple-800',
      history: 'bg-orange-100 text-orange-800',
      geography: 'bg-teal-100 text-teal-800',
      chemistry: 'bg-red-100 text-red-800',
      physics: 'bg-indigo-100 text-indigo-800',
      biology: 'bg-emerald-100 text-emerald-800',
      literature: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors?.[subject] || colors?.other;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleMenuToggle = (e) => {
    e?.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuAction = (action, e) => {
    e?.stopPropagation();
    setShowMenu(false);
    action();
  };

  const handleFavoriteToggle = (e) => {
    e?.stopPropagation();
    onToggleFavorite(note?.id);
  };

  const handleCardClick = () => {
    onView(note);
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 hover:shadow-card transition-smooth cursor-pointer relative ${className}`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate mb-1">
            {note?.title}
          </h3>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSubjectColor(note?.subject)}`}>
            {note?.subject?.charAt(0)?.toUpperCase() + note?.subject?.slice(1)}
          </span>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className="h-8 w-8"
          >
            <Icon 
              name={note?.isFavorite ? "Star" : "Star"} 
              size={16}
              className={note?.isFavorite ? "text-yellow-500 fill-current" : "text-muted-foreground"}
            />
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuToggle}
              className="h-8 w-8"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-lg shadow-modal py-1 z-10">
                <button
                  onClick={(e) => handleMenuAction(() => onEdit(note), e)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="Edit" size={14} />
                  Edit
                </button>
                <button
                  onClick={(e) => handleMenuAction(() => onDelete(note?.id), e)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-muted transition-smooth"
                >
                  <Icon name="Trash2" size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Content Preview */}
      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
        {note?.content}
      </p>
      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Created {formatDate(note?.createdAt)}</span>
        {note?.updatedAt !== note?.createdAt && (
          <span>Updated {formatDate(note?.updatedAt)}</span>
        )}
      </div>
      {/* Click overlay to close menu when clicking outside */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default NoteCard;