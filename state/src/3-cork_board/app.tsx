import React from 'react';
import useCorkState from './useCorkState';
import Note from './Note';

const App = () => {
  const { board, includeNote } = useCorkState();

  return (
    <div>
      <div>
        <button onClick={includeNote}>new note</button>
      </div>
      {board.map(note => <Note key={note.id} note={note}/>)}
    </div>
  );
};

export default App;
