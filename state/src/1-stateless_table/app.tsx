import React from 'react';
import PlayerTable from '../components/players-table';
import { COLUMNS, PLAYERS } from '../player-data';

const App = () => (
  <div>
    <h1>Stateless table</h1>
    <PlayerTable columns={COLUMNS} data={PLAYERS} />
  </div>
);

export default App;
