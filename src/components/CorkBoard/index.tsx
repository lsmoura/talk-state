import React, { useCallback, useMemo, useState } from 'react';
import Note, { NoteType } from './Note';
import EditNoteModal from './EditNoteModal';

type CorkBoardProps = {
  notes: ReadonlyArray<Readonly<NoteType>>,
  NoteComponent?: any,
  updateNote?: (note: Readonly<NoteType>) => void,
  deleteNote?: (noteId: string) => void,
};

const CorkBoard = ({
  notes,
  NoteComponent = Note,
  updateNote,
  deleteNote,
}: CorkBoardProps) => {
  const [editNoteId, setEditNoteId] = useState<string | void>(null);

  const handleStartEditing = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const noteId = event.target.getAttribute('data-noteid');
      setEditNoteId(noteId);
    },
    [setEditNoteId],
  );
  const handleDeleteNote = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const noteId = event.target.getAttribute('data-noteid');

      deleteNote(noteId);
    },
    [deleteNote],
  );
  const onEditNote = useCallback(
    (note: NoteType) => {
      const data = {
        id: editNoteId,
        ...note,
      };

      updateNote(data);
      setEditNoteId(null);
    },
    [editNoteId, updateNote, setEditNoteId],
  );

  const editingNote = useMemo<NoteType | void>(
    () => {
      if (!editNoteId || editNoteId.length <= 0) return null;

      return notes.find(e => e.id === editNoteId);
    },
    [notes, editNoteId],
  );

  return (
    <React.Fragment>
      <div className={'cork-board'}>
        {notes.map(note =>
          <NoteComponent
            key={note.id}
            note={note}
            updateNote={updateNote}
            startEditing={handleStartEditing}
            deleteNote={handleDeleteNote}
          />)
        }
      </div>
      {editingNote
        ? <EditNoteModal
          note={editingNote}
          onUpdate={onEditNote}
          onClose={() => {
            setEditNoteId(null);
          }}
        />
        : null
      }
    </React.Fragment>
  );
};

export default CorkBoard;
