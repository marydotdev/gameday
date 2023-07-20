<script>
	export let data;
	const { game } = data;

	// console.log(game.gameData)
</script>

<div>
	<!-- <h1>{game.gamePk}</h1> -->
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

	<div class="flex gap-2">
		<img
			src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.batter.id}/silo/180`}
			alt={game.liveData.plays.currentPlay.matchup.batter.fullName}
			class="w-12 h-12"
		/>
    <p>{game.liveData.plays.currentPlay.matchup.batter.fullName}</p>
	</div>
	<div class="flex gap-2">
		<img
			src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.pitcher.id}/silo/180`}
			alt={game.liveData.plays.currentPlay.matchup.pitcher.fullName}
			class="w-12 h-12"
		/>
    <p>{game.liveData.plays.currentPlay.matchup.pitcher.fullName}</p>
	</div>

  <!-- <div>
    {#each game.liveData.boxscore.teams.away.battingOrder as batter}
    <div class="flex gap-2">
      <img
			src={`https://midfield.mlbstatic.com/v1/people/${batter}/silo/180`}
			alt={batter}
			class="w-12 h-12"
		  />
      <p>{batter}</p>
    </div>
    {/each}
  </div> -->

  <div class="flex justify-between">
    <div>
    <h3>Away roster</h3>
    {#each game.liveData.boxscore.teams.away.battingOrder as batterId}
      <!-- Retrieve the player object using the batterId -->
      {#if game.liveData.boxscore.teams.away.players[`ID${batterId}`]}
        {@const player = game.liveData.boxscore.teams.away.players[`ID${batterId}`]}
        <div class="flex gap-2">
          <img
            src={`https://midfield.mlbstatic.com/v1/people/${batterId}/silo/180`}
            alt={player.person.fullName}
            class="w-12 h-12"
          />
          <div class="flex gap-2">
            <p>{player.jerseyNumber}</p>
            <p>{player.person.fullName}</p>
            <p>{player.position.name}</p>
            <p>{player.seasonStats.batting.avg}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <div>
    <h3>Home roster</h3>
    {#each game.liveData.boxscore.teams.home.battingOrder as batterId}
      <!-- Retrieve the player object using the batterId -->
      {#if game.liveData.boxscore.teams.home.players[`ID${batterId}`]}
        {@const player = game.liveData.boxscore.teams.home.players[`ID${batterId}`]}
        <div class="flex gap-2">
          <img
            src={`https://midfield.mlbstatic.com/v1/people/${batterId}/silo/180`}
            alt={player.person.fullName}
            class="w-12 h-12"
          />
          <div class="flex gap-2">
            <p>{player.jerseyNumber}</p>
            <p>{player.person.fullName}</p>
            <p>{player.position.name}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
  </div>





	<a href="/">back</a>
</div>
