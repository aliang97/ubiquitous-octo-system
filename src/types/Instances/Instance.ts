export interface Instance {
  trueTick: number;
  gameTick: number;
  isPaused: boolean;
  clockId?: number;
  errorMsg?: string;
}
