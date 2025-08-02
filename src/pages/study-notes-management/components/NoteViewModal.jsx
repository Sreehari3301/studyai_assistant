import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NoteViewModal = ({ note, isOpen, onClose, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note?.title || '');
  const [editedContent, setEditedContent] = useState(note?.content || '');
  const [editedSubject, setEditedSubject] = useState(note?.subject || '');
  const [isLoading, setIsLoading] = useState(false);

  const subjectOptions = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'biology', label: 'Biology' },
    { value: 'literature', label: 'Literature' },
    { value: 'other', label: 'Other' }
  ];

  React.useEffect(() => {
    if (note) {
      setEditedTitle(note?.title);
      setEditedContent(note?.content);
      setEditedSubject(note?.subject);
    }
  }, [note]);

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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedTitle?.trim() || !editedContent?.trim() || !editedSubject) return;

    setIsLoading(true);
    
    const updatedNote = {
      ...note,
      title: editedTitle?.trim(),
      content: editedContent?.trim(),
      subject: editedSubject,
      updatedAt: new Date()?.toISOString()
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave(updatedNote);
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditedTitle(note?.title);
    setEditedContent(note?.content);
    setEditedSubject(note?.subject);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      onDelete(note?.id);
      setIsLoading(false);
      onClose();
    }
  };

  const handleClose = () => {
    if (isEditing) {
      handleCancel();
    }
    onClose();
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={isLoading}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h2 className="text-lg font-semibold text-foreground">
              {isEditing ? 'Edit Note' : 'View Note'}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  iconName="Edit"
                  iconPosition="left"
                  disabled={isLoading}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  iconName="Trash2"
                  iconPosition="left"
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  iconName="Save"
                  iconPosition="left"
                  loading={isLoading}
                  disabled={!editedTitle?.trim() || !editedContent?.trim() || !editedSubject}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Note Title"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e?.target?.value)}
                required
                disabled={isLoading}
              />

              <Select
                label="Subject"
                options={subjectOptions}
                value={editedSubject}
                onChange={setEditedSubject}
                required
                disabled={isLoading}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Content <span className="text-error">*</span>
                </label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e?.target?.value)}
                  disabled={isLoading}
                  rows={12}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {note?.title}
                  </h1>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getSubjectColor(note?.subject)}`}>
                    {note?.subject?.charAt(0)?.toUpperCase() + note?.subject?.slice(1)}
                  </span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {note?.content}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                <span>Created: {formatDate(note?.createdAt)}</span>
                {note?.updatedAt !== note?.createdAt && (
                  <span>Last updated: {formatDate(note?.updatedAt)}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isLoading}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteViewModal;