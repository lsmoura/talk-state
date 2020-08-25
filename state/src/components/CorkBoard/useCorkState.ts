import { useCallback, useState } from 'react';
import randomString from '../../randomString';
import { NoteType } from './Note';

type useCorkStateReturnType = {
  updateNote: (info: NoteType) => void,
  deleteNote: (noteId) => void,
  includeNote: () => void,
  board: ReadonlyArray<NoteType>,
}
const useCorkState = (): useCorkStateReturnType => {
  const [board, setBoard] = useState<Array<NoteType>>([]);

  const includeNote = useCallback(() => {
    setBoard(e => [
      ...e,
      {
        id: randomString(),
        x: 10,
        y: 10,
        contents: 'hello world',
      },
    ]);
  }, [setBoard]);

  const updateNote = useCallback((info: NoteType) => {
    const note = board.find(e => e.id === info.id);
    if (!note) {
      console.warn('cannot update note', info);
      return;
    }

    const newNote = {
      ...note,
      ...info,
    };

    setBoard(data => data.filter(e => e.id !== info.id).concat(newNote));
  }, [board, setBoard]);

  const deleteNote = useCallback((noteId) => {
    setBoard(board => board.filter(note => note.id !== noteId));
  }, [setBoard]);

  return { board, includeNote, updateNote, deleteNote };
};

export default useCorkState;
