<script>
	export let data;
	const { game } = data;

	// console.log(game.gameData)
</script>

<div>
	<h1>{game.gamePk}</h1>
	<p>{game.gameData.teams.away.name} @ {game.gameData.teams.home.name}</p>
	<div class="flex gap-2">
		<p>{game.liveData.linescore.inningState}</p>
		<p>{game.liveData.linescore.currentInning}</p>
	</div>

	<div class="flex gap-2">
		<p>{game.liveData.plays.currentPlay.count.balls}</p>
		<p>-</p>
		<p>{game.liveData.plays.currentPlay.count.strikes}</p>
	</div>
	<div>
		{#if game.liveData.linescore.outs === 0}
			<p>0 outs</p>
		{:else if game.liveData.linescore.outs === 1}
			<p>1 out</p>
		{:else if game.liveData.linescore.outs === 2}
			<p>2 outs</p>
		{:else if game.liveData.linescore.outs === 3}
			<p>3 outs</p>
		{/if}
	</div>

	<div>
		<p>{game.liveData.plays.currentPlay.matchup.batter.fullName}</p>
		<img
			src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.batter.id}/silo/180?zoom=1.2`}
			alt={game.liveData.plays.currentPlay.matchup.batter.fullName}
			class="w-12 h-12"
		/>
	</div>
	<div>
		<p>{game.liveData.plays.currentPlay.matchup.pitcher.fullName}</p>
		<img
			src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.pitcher.id}/silo/180?zoom=1.2`}
			alt={game.liveData.plays.currentPlay.matchup.pitcher.fullName}
			class="w-12 h-12"
		/>
	</div>

	<a href="/">back</a>
</div>
