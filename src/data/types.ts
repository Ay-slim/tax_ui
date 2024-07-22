export type ContributionsUnit = {
  name: string;
  percentage: number;
}

export type ContributionsType = {
  [key: string]: ContributionsUnit;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;