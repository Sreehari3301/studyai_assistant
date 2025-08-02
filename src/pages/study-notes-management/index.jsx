import React, { useState, useEffect } from 'react';
import PersistentHeader from '../../components/ui/PersistentHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import CreateNoteModal from './components/CreateNoteModal';
import NotesGrid from './components/NotesGrid';
import NoteViewModal from './components/NoteViewModal';

const StudyNotesManagement = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Mock data for notes
  const mockNotes = [
    {
      id: '1',
      title: 'Quadratic Equations',
      content: `Quadratic equations are polynomial equations of degree 2. The standard form is ax² + bx + c = 0, where a ≠ 0.\n\nKey concepts:\n• Discriminant: b² - 4ac\n• If discriminant > 0: two real roots\n• If discriminant = 0: one real root\n• If discriminant < 0: no real roots\n\nSolving methods:\n1. Factoring\n2. Completing the square\n3. Quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\nExample: x² - 5x + 6 = 0\nFactoring: (x-2)(x-3) = 0\nSolutions: x = 2 or x = 3`,
      subject: 'mathematics',
      createdAt: '2025-01-28T10:30:00.000Z',
      updatedAt: '2025-01-30T14:20:00.000Z',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Photosynthesis Process',
      content: `Photosynthesis is the process by which plants convert light energy into chemical energy.\n\nEquation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nTwo main stages:\n\n1. Light-dependent reactions (Thylakoids):\n• Chlorophyll absorbs light\n• Water molecules split (photolysis)\n• ATP and NADPH produced\n• Oxygen released as byproduct\n\n2. Light-independent reactions (Calvin Cycle):\n• Occurs in stroma\n• CO₂ fixation\n• Uses ATP and NADPH from light reactions\n• Produces glucose\n\nFactors affecting photosynthesis:\n• Light intensity\n• Temperature\n• CO₂ concentration\n• Water availability`,
      subject: 'biology',
      createdAt: '2025-01-29T09:15:00.000Z',
      updatedAt: '2025-01-29T09:15:00.000Z',
      isFavorite: false
    },
    {
      id: '3',
      title: 'World War II Timeline',
      content: `Major events of World War II (1939-1945):\n\n1939:\n• September 1: Germany invades Poland\n• September 3: Britain and France declare war on Germany\n\n1940:\n• April-June: Germany conquers Norway, Denmark, Belgium, Netherlands, France\n• July-October: Battle of Britain\n\n1941:\n• June 22: Operation Barbarossa - Germany invades Soviet Union\n• December 7: Pearl Harbor attack - US enters war\n\n1942:\n• June 4-7: Battle of Midway\n• August-February 1943: Battle of Stalingrad\n\n1943:\n• July: Battle of Kursk\n• September: Italy surrenders\n\n1944:\n• June 6: D-Day landings in Normandy\n• August: Liberation of Paris\n\n1945:\n• May 8: VE Day - Germany surrenders\n• August 6 & 9: Atomic bombs on Hiroshima and Nagasaki\n• August 15: VJ Day - Japan surrenders`,
      subject: 'history',
      createdAt: '2025-01-27T16:45:00.000Z',
      updatedAt: '2025-01-31T11:30:00.000Z',
      isFavorite: true
    },
    {
      id: '4',
      title: 'Shakespeare\'s Literary Devices',
      content: `Common literary devices used by William Shakespeare:\n\n1. Metaphor:\n• Direct comparison without "like" or "as"\n• Example: "All the world's a stage" (As You Like It)\n\n2. Simile:\n• Comparison using "like" or "as"\n• Example: "My love is as a fever" (Sonnet 147)\n\n3. Personification:\n• Giving human qualities to non-human things\n• Example: "When yellow leaves, or none, or few, do hang" (Sonnet 73)\n\n4. Alliteration:\n• Repetition of initial consonant sounds\n• Example: "Fair is foul, and foul is fair" (Macbeth)\n\n5. Dramatic Irony:\n• Audience knows something characters don't\n• Example: Romeo thinking Juliet is dead\n\n6. Soliloquy:\n• Character speaking thoughts aloud\n• Example: "To be or not to be" (Hamlet)\n\n7. Iambic Pentameter:\n• Rhythmic pattern of unstressed/stressed syllables\n• Most of Shakespeare's plays written in this meter`,
      subject: 'literature',
      createdAt: '2025-01-26T13:20:00.000Z',
      updatedAt: '2025-01-26T13:20:00.000Z',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Chemical Bonding Types',
      content: `Three main types of chemical bonds:\n\n1. Ionic Bonds:\n• Between metal and non-metal atoms\n• Transfer of electrons\n• Forms ions (cations and anions)\n• Example: NaCl (sodium chloride)\n• Properties: high melting point, conduct electricity when dissolved\n\n2. Covalent Bonds:\n• Between non-metal atoms\n• Sharing of electrons\n• Can be single, double, or triple bonds\n• Example: H₂O (water), CO₂ (carbon dioxide)\n• Properties: lower melting points, poor electrical conductors\n\n3. Metallic Bonds:\n• Between metal atoms\n• "Sea of electrons" model\n• Electrons are delocalized\n• Example: copper, iron, aluminum\n• Properties: malleable, ductile, good conductors\n\nBond strength order: Triple > Double > Single\nElectronegativity difference determines bond type:\n• > 1.7: Ionic\n• 0.4-1.7: Polar covalent\n• < 0.4: Nonpolar covalent`,
      subject: 'chemistry',
      createdAt: '2025-01-25T08:10:00.000Z',
      updatedAt: '2025-01-29T15:45:00.000Z',
      isFavorite: true
    },
    {
      id: '6',
      title: 'Newton\'s Laws of Motion',
      content: `Sir Isaac Newton's three fundamental laws of motion:\n\n1. First Law (Law of Inertia):\n• An object at rest stays at rest, and an object in motion stays in motion\n• Unless acted upon by an unbalanced force\n• Example: Seatbelts in cars, objects sliding on ice\n\n2. Second Law (F = ma):\n• Force equals mass times acceleration\n• F = ma (Force = mass × acceleration)\n• More force = more acceleration\n• More mass = less acceleration for same force\n• Example: Pushing a heavy vs light box\n\n3. Third Law (Action-Reaction):\n• For every action, there is an equal and opposite reaction\n• Forces always occur in pairs\n• Example: Walking (push ground backward, ground pushes you forward)\n• Rocket propulsion, swimming\n\nApplications:\n• Vehicle safety systems\n• Sports biomechanics\n• Space exploration\n• Engineering design\n\nThese laws form the foundation of classical mechanics and are essential for understanding motion in our everyday world.`,
      subject: 'physics',createdAt: '2025-01-24T11:55:00.000Z',updatedAt: '2025-01-24T11:55:00.000Z',
      isFavorite: false
    }
  ];

  // Initialize notes from mock data
  useEffect(() => {
    setNotes(mockNotes);
  }, []);

  const handleCreateNote = (newNote) => {
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const handleToggleFavorite = (noteId) => {
    setNotes(prevNotes =>
      prevNotes?.map(note =>
        note?.id === noteId
          ? { ...note, isFavorite: !note?.isFavorite }
          : note
      )
    );
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes?.filter(note => note?.id !== noteId));
  };

  const handleViewNote = (note) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleSaveNote = (updatedNote) => {
    setNotes(prevNotes =>
      prevNotes?.map(note =>
        note?.id === updatedNote?.id ? updatedNote : note
      )
    );
    setSelectedNote(updatedNote);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Persistent Header */}
      <PersistentHeader />

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 mt-2">
            <h1 className="text-2xl font-bold text-foreground mb-2">Study Notes</h1>
            <p className="text-muted-foreground">
              Organize and manage your study materials
            </p>
          </div>

          {/* Search and Create Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            <Button
              variant="default"
              onClick={() => setIsCreateModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
              className="sm:w-auto shrink-0"
            >
              Create Note
            </Button>
          </div>

          {/* Notes Grid */}
          <div className="pb-4">
            <NotesGrid
              notes={notes}
              searchTerm={searchTerm}
              onToggleFavorite={handleToggleFavorite}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onView={handleViewNote}
            />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomTabNavigation />

      {/* Modals */}
      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateNote}
      />

      <NoteViewModal
        note={selectedNote}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default StudyNotesManagement;