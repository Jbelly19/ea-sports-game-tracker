import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';

interface Game {
  home_player_id: string;
  away_player_id: string;
  home_stats: GameStats;
  away_stats: GameStats;
}

interface GameStats {
  team: string;
  score: number;
  shots: number;
  hits: number;
  time_on_attack: string;
  passing: string;
  faceoff_wins: number;
  penalty_minutes: string;
  powerplays: number;
  powerplay_goals: number;
  powerplay_minutes: string;
  shorthanded_goals: number;
}

interface GameProps {
  games: Game[];
}

const Game: NextPage<GameProps> = ({ games }: GameProps) => {
  return (
    <div>
      {games.map((game, index) => {
        return (
          <ul key={index}>
            <h1>{`Score: ${game.home_stats.score} - ${game.away_stats.score}`}</h1>
            <li>
              <h1>Home Player: {game.home_player_id}</h1>
              <h3>Home Stats</h3>
              <p>Team: {game.home_stats.team}</p>
              <p>Shots: {game.home_stats.shots}</p>
              <p>Hits: {game.home_stats.hits}</p>
              <p>Time On Attack: {game.home_stats.time_on_attack}</p>
              <p>Passing: {game.home_stats.passing}</p>
              <p>Faceoff Wins: {game.home_stats.faceoff_wins}</p>
              <p>Penalty Minutes: {game.home_stats.penalty_minutes}</p>
              <p>{`Powerplays: ${game.home_stats.powerplays}/${game.home_stats.powerplay_goals}`}</p>
              <p>Powerplay Minutes: {game.home_stats.powerplay_minutes}</p>
              <p>Shorthanded Goals: {game.home_stats.shorthanded_goals}</p>
            </li>
            <li>
              <h1>Away Player: {game.away_player_id}</h1>
              <h3>Away Stats</h3>
              <p>Team: {game.away_stats.team}</p>
              <p>Shots: {game.away_stats.shots}</p>
              <p>Hits: {game.away_stats.hits}</p>
              <p>Time On Attack: {game.away_stats.time_on_attack}</p>
              <p>Passing: {game.away_stats.passing}</p>
              <p>Faceoff Wins: {game.away_stats.faceoff_wins}</p>
              <p>Penalty Minutes: {game.away_stats.penalty_minutes}</p>
              <p>{`Powerplays: ${game.away_stats.powerplays}/${game.away_stats.powerplay_goals}`}</p>
              <p>Powerplay Minutes: {game.away_stats.powerplay_minutes}</p>
              <p>Shorthanded Goals: {game.away_stats.shorthanded_goals}</p>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

Game.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/games');
  const json = await res.json();
  return { games: json.games };
};

export default Game;
