import React, { useCallback, useMemo, useState } from 'react';
import useCorkState from './useCorkState';
import Note, { NoteType } from './Note';
import EditNoteModal from './EditNoteModal';

const App = () => {
  const { board, includeNote, updateNote, deleteNote } = useCorkState();
  const [withMemo, setWithMemo] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<string | void>(null);

  const handleMemoEvent = useCallback((event) => {
    setWithMemo(event.target.checked);
  }, [setWithMemo]);

  const NoteComponent = useMemo(
    () => withMemo ? React.memo(Note) : Note,
    [withMemo],
  );

  const handleStartEditing = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const noteId = event.target.getAttribute('data-noteid');
    if (!board.find(e => e.id === noteId)) {
      console.warn('cannot edit: note not found', noteId);
      return;
    }

    setEditNoteId(noteId);
  }, [setEditNoteId, board]);
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

  return (
    <div>
      <div>
        <button onClick={includeNote}>new note</button>
      </div>
      <div>
        <label htmlFor={'use-with-memo'}>use React.memo</label>
        <input
          name={'use-with-memo'}
          id={'use-with-memo'}
          type={'checkbox'}
          checked={withMemo}
          onChange={handleMemoEvent}
        />
      </div>
      {board.map(note =>
        <NoteComponent
          key={note.id}
          note={note}
          updateNote={updateNote}
          startEditing={handleStartEditing}
          deleteNote={handleDeleteNote}
        />)
      }
      {editNoteId
        ? <EditNoteModal
          note={board.find(e => e.id === editNoteId)}
          onUpdate={onEditNote}
          onClose={() => {
            setEditNoteId(null);
          }}
        /> : null
      }
    </div>
  );
};

export default App;
