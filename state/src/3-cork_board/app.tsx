import React, { useCallback, useMemo, useState } from 'react';
import useCorkState from './useCorkState';
import Note from './Note';
import CorkBoard from './CorkBoard';

const App = () => {
  const { board, includeNote, updateNote, deleteNote } = useCorkState();
  const [withMemo, setWithMemo] = useState<boolean>(false);

  const handleMemoEvent = useCallback((event) => {
    setWithMemo(event.target.checked);
  }, [setWithMemo]);

  const NoteComponent = useMemo(
    () => withMemo ? React.memo(Note) : Note,
    [withMemo],
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
      <CorkBoard
        NoteComponent={NoteComponent}
        notes={board}
        updateNote={updateNote}
        deleteNote={deleteNote}
      />
    </div>
  );
};

export default App;
