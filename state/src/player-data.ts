export type IndividualPlayer = {
  name: string,
  number: number,
  team: string,
};
export type PlayerData = Array<IndividualPlayer>;

export const COLUMNS = ['team', 'number', 'name'];
export const PLAYERS = [
  { team: 'buccaneers', name: 'Tom Brady', number: 12 },
  { team: 'buccaneers', name: 'Rob Gronkowsy', number: 0 },
  { team: 'patriots', name: 'Julian Edelman', number: 12 },
];