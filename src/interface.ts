export type modeProps = {
  selected: string;
}

export type configProps = {
  difficulty: number[];
  difficultyText: string;
  selected: string;
  reverse: boolean;
}

export type MenuProps = {
  hideMenu: () => void;
}

export type GameModeProps = {
  gamemode: string;
};

export type customProps = {
  add: boolean;
  sub: boolean;
  multi: boolean;
  div: boolean;
  min: number;
  max: number;
  terms: number;
}

export type settingsProps = {
  selected: boolean;
}