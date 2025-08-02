import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateNoteModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
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

  const handleSave = async () => {
    if (!title?.trim() || !content?.trim() || !subject) return;

    setIsLoading(true);
    
    const newNote = {
      id: Date.now()?.toString(),
      title: title?.trim(),
      content: content?.trim(),
      subject,
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString(),
      isFavorite: false
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave(newNote);
    setTitle('');
    setContent('');
    setSubject('');
    setIsLoading(false);
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setSubject('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-md max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <h2 className="text-lg font-semibold text-foreground">Create New Note</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isLoading}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <Input
            label="Note Title"
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e?.target?.value)}
            required
            disabled={isLoading}
          />

          <Select
            label="Subject"
            placeholder="Select subject"
            options={subjectOptions}
            value={subject}
            onChange={setSubject}
            required
            disabled={isLoading}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Content <span className="text-error">*</span>
            </label>
            <textarea
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) => setContent(e?.target?.value)}
              disabled={isLoading}
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            loading={isLoading}
            disabled={!title?.trim() || !content?.trim() || !subject}
          >
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;