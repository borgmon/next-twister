import { blue, green, red, yellow } from "@mui/material/colors";
import { GameSetting } from "../pages";

export class Player {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public limbColors: number[] = [-1, -1, -1, -1];

  public static intToLimb(i: number): string {
    type LimbMap = {
      [key: string]: string;
    };
    const map: LimbMap = {
      0: "Left Hand",
      1: "Right Hand",
      2: "Left Foot",
      3: "Right Foot",
    };
    return map[i];
  }

  public randomLimb(color: number, gameState: GameSetting): number {
    const limb = gameState.enablePrioritizeIdleLimb
      ? this.getIdleLimb()
      : randomInt(0, 3);

    if (
      this.limbColors[limb] === color &&
      gameState.enableForcePlayerMoveNewColor
    ) {
      return this.randomLimb(color, gameState);
    } else {
      this.limbColors[limb] = color;
      return limb;
    }
  }

  getIdleLimb() {
    for (var i = 0; i < this.limbColors.length; i++) {
      if (this.limbColors[i] == -1) {
        return i;
      }
    }
    return randomInt(0, 3);
  }
  public static initNPlayers(n: number) {
    var result = [];
    for (var i = 0; i < n; i++) {
      result.push(new Player((i + 1).toString()));
    }
    return result;
  }
}

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class Game {
  public colorTimes: number[];
  public color: number;
  public times: number;
  public lastPlayer: Player | undefined;

  constructor(color: number, times: number) {
    this.color = color;
    this.times = times;

    this.colorTimes = [];
    for (var i = 0; i < color; i++) {
      this.colorTimes[i] = 0;
    }
  }

  isBoardFull() {
    return (
      this.colorTimes.reduce((prev, curr) => {
        return prev + curr;
      }) ==
      this.color * this.times
    );
  }

  public next(gameState: GameSetting): {
    player: number;
    limb: number;
    color: number;
  } {
    const nextPlayerIndex = randomInt(0, gameState.players.length - 1);
    const nextPlayer = gameState.players[nextPlayerIndex];
    if (this.lastPlayer == nextPlayer && gameState.disableSamePlayerInARow) {
      return this.next(gameState);
    }

    const nextColor = randomInt(0, this.color - 1);

    if (this.colorTimes[nextColor] >= this.color && !this.isBoardFull()) {
      return this.next(gameState);
    }

    this.colorTimes[nextColor] += 1;

    const playerLimb = nextPlayer.randomLimb(nextColor, gameState);

    this.lastPlayer = nextPlayer;

    return { player: nextPlayerIndex, limb: playerLimb, color: nextColor };
  }

  public static intToColorString(i: number) {
    type ColorMap = {
      [key: string]: string;
    };
    const map: ColorMap = {
      0: "Green",
      1: "Yellow",
      2: "Blue",
      3: "Red",
    };
    return map[i];
  }

  public static intToColor(i: number) {
    type ColorMap = {
      [key: string]: string;
    };
    const map: ColorMap = {
      0: green[500],
      1: yellow[800],
      2: blue[500],
      3: red[500],
    };
    return map[i];
  }
}
