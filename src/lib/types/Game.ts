export interface Game {
  gamePk: number;
  gameDate: string;
  status: {
    abstractGameCode: string;
  };
  teams: {
    away: {
      team: {
        id: number;
        name: string;
      };
      score?: number;
    };
    home: {
      team: {
        id: number;
        name: string;
      };
      score?: number;
    };
  };
  liveData?: {
    numOuts?: number;
    batterCount?: string;
    inningState?: string;
    inning?: number;
    bases?: string;
  };
}
