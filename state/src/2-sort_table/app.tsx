import React, { useCallback, useMemo, useState } from 'react';
import PlayerTable from '../components/players-table';
import { COLUMNS, PLAYERS } from '../player-data';

const App = () => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const handleColumnClick = useCallback((event) => {
    const columnName = event.target.getAttribute('data-name');
    setSortedColumn(oldColumn => oldColumn === columnName ? null : columnName);
  }, []);

  const players = useMemo(() => {
    if (!sortedColumn) return PLAYERS;

    return PLAYERS.concat().sort((a, b) => {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];

      if (typeof aValue === 'number') return a > b;
      return aValue.localeCompare(bValue);
    });
  }, [PLAYERS, sortedColumn]);

  return (
    <div>
      <h1>Stateful table</h1>
      {sortedColumn ? <div>Sorted by: {sortedColumn}</div> : null}
      <PlayerTable onColumnClick={handleColumnClick} columns={COLUMNS} data={players}/>
    </div>
  );
};

export default App;
