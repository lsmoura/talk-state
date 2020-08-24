export type IndividualPlayer = {
  id: string,
  name: string,
  number: number,
  team: string,
};

export const COLUMNS = Object.freeze<string>(['team', 'number', 'name']);
export const PLAYERS = Object.freeze<IndividualPlayer>([
  { id: 'tom-brady-12', team: 'buccaneers', name: 'Tom Brady', number: 12 },
  { id: 'rob-gronkowsky-0', team: 'buccaneers', name: 'Rob Gronkowsy', number: 0 },
  { id: 'julian-edelman-0', team: 'patriots', name: 'Julian Edelman', number: 12 },
]);