export interface modeProps {
    selected: string;
}

export interface configProps {
    difficulty: number[];
    difficultyText: string;
    selected: string;
}

export interface MenuProps {
    hideMenu: () => void;
}

export type GameModeProps = {
    gamemode: string;
}