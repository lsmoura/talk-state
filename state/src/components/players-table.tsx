import React from 'react';
import { IndividualPlayer } from '../player-data';

type PlayerTableProps = {
  columns: ReadonlyArray<string>,
  data: ReadonlyArray<IndividualPlayer>,
  onColumnClick?: (any) => void,
};

const PlayerTable = ({ columns, data, onColumnClick }: PlayerTableProps) => (
  <table>
    <thead>
    <tr>
      {columns.map((name, idx) => (
        <th onClick={onColumnClick} key={idx} data-name={name}>
          {name}
        </th>
      ))}
    </tr>
    </thead>
    <tbody>
    {data.map((player, idx) => (
      <tr key={player.id}>
        {columns.map((header, headerIdx) => (
          <td key={`entry-${idx}-${headerIdx}`}>
            {player[header]}
          </td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
);

export default PlayerTable;