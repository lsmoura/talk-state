import { NoteType } from './Note';
import React, { useCallback } from 'react';

type NotesListProps = {
  notes: ReadonlyArray<NoteType>,
  onDelete?: (noteId: string) => void,
};
const NotesList = ({ notes, onDelete }: NotesListProps) => {
  const handleDelete = useCallback((event) => {
    if (!onDelete) return;
    const noteId = event.target.getAttribute('data-noteid');

    onDelete(noteId);
  }, [onDelete]);
  return (
    <div style={{ maxWidth: '300px' }}>
      <h2>List of notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <span>{note.contents}</span>
            {onDelete
              ? <span data-noteid={note.id} onClick={handleDelete}>[X]</span>
              : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;