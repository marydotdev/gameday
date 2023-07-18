<script>
	export let data;
	const { game } = data;

  // console.log(game.gameData)

</script>

<div>
  <h1>{game.gamePk}</h1>
  <p>{game.gameData.teams.away.name} @ {game.gameData.teams.home.name}</p>

  <p>{game.liveData.plays.currentPlay.count.balls}</p>
  <p>{game.liveData.plays.currentPlay.count.strikes}</p>
  <p>{game.liveData.plays.currentPlay.count.outs}</p>

  <div>
    <p>{game.liveData.plays.currentPlay.matchup.batter.fullName}</p>
    <img src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.batter.id}/silo/180?zoom=1.2`} alt={game.liveData.plays.currentPlay.matchup.batter.fullName} class="w-12 h-12" />
  </div>
  <div>
    <p>{game.liveData.plays.currentPlay.matchup.pitcher.fullName}</p>
    <img src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.pitcher.id}/silo/180?zoom=1.2`} alt={game.liveData.plays.currentPlay.matchup.pitcher.fullName} class="w-12 h-12" />
  </div>


  <a href="/">back</a>

</div>
