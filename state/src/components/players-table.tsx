import React from 'react';
import { PlayerData } from '../player-data';

type PlayerTableProps = {
  columns: Array<string>,
  data: PlayerData,
};

const PlayerTable = ({ columns, data }: PlayerTableProps) => (
  <table>
    <thead>
    <tr>
      {columns.map((name, idx) => <th key={idx}>{name}</th>)}
    </tr>
    </thead>
    <tbody>
    {data.map((player, idx) => (
      <tr key={`player-${idx}`}>
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