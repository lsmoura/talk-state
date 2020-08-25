import React, { useCallback, useMemo, useState } from 'react';
import useCorkState from '../components/CorkBoard/useCorkState';
import Note from '../components/CorkBoard/Note';
import CorkBoard from '../components/CorkBoard';
import NotesList from '../components/CorkBoard/NotesList';

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
    <div className={'app-root'}>
      <div
        className={'add-button'}
        onClick={includeNote}
      >
        +
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
      <div className={'cork-container'}>
        <NotesList notes={board} onDelete={deleteNote}/>
        <CorkBoard
          NoteComponent={NoteComponent}
          notes={board}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
