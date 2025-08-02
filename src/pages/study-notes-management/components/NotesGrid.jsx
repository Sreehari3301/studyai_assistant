import React from 'react';
import NoteCard from './NoteCard';

const NotesGrid = ({ 
  notes, 
  onToggleFavorite, 
  onEdit, 
  onDelete, 
  onView,
  searchTerm,
  className = '' 
}) => {
  const filteredNotes = notes?.filter(note => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm?.toLowerCase();
    return (note?.title?.toLowerCase()?.includes(searchLower) ||
    note?.content?.toLowerCase()?.includes(searchLower) || note?.subject?.toLowerCase()?.includes(searchLower));
  });

  if (filteredNotes?.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchTerm ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-muted-foreground max-w-sm">
            {searchTerm 
              ? `No notes match "${searchTerm}". Try adjusting your search terms.`
              : 'Create your first note to get started with organizing your study materials.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {filteredNotes?.map((note) => (
        <NoteCard
          key={note?.id}
          note={note}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default NotesGrid;