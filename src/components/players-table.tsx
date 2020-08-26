import React from 'react';
import { IndividualPlayer } from '../player-data';

type PlayerTableProps = {
  columns: ReadonlyArray<string>,
  data: ReadonlyArray<IndividualPlayer>,
  onColumnClick?: (any) => void,
};

type PlayerRowProps = {
  columns: ReadonlyArray<string>,
  player: Readonly<IndividualPlayer>,
};

const PlayerRow = ({ columns, player }: PlayerRowProps) => (
  <tr>{columns.map((field) => (
    <td key={`${player.id}-${field}`}>{player[field]}</td>
  ))}</tr>
);

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
    {data.map((player) => (
      <PlayerRow key={player.id} player={player} columns={columns} />
    ))}
    </tbody>
  </table>
);

export default PlayerTable;