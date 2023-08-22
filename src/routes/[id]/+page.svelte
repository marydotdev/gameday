<script>
	import AtBat from '$lib/AtBat.svelte';
  import Field from '$lib/Field.svelte';
	import GameState from '$lib/GameState.svelte';
	import Pitching from '$lib/Pitching.svelte';
	import Roster from '$lib/Roster.svelte';
	import Linescore from '$lib/Linescore.svelte';

	export let data;
	const { game } = data;

  const gameState = game.gameData.status.abstractGameCode;

	const batter = game.liveData.plays.currentPlay.matchup.batter;
	const pitcher = game.liveData.plays.currentPlay.matchup.pitcher;

	// Determine if they are on the home or away team
	const batterTeam = game.liveData.boxscore.teams.home.players[`ID${batter.id}`] ? 'home' : 'away';
	const pitcherTeam = game.liveData.boxscore.teams.home.players[`ID${pitcher.id}`]
		? 'home'
		: 'away';

	// Access their stats accordingly
	const batterStats =
		game.liveData.boxscore.teams[batterTeam].players[`ID${batter.id}`].seasonStats.batting;
	const pitcherStats =
		game.liveData.boxscore.teams[pitcherTeam].players[`ID${pitcher.id}`].seasonStats.pitching;

	const batterDetails = game.liveData.boxscore.teams[batterTeam].players[`ID${batter.id}`];
	const pitcherDetails = game.liveData.boxscore.teams[pitcherTeam].players[`ID${pitcher.id}`];

	let inningLinescore = game.liveData.linescore.innings;

	let defenseLinescore = game.liveData.linescore.defense;
	let numOuts = game.liveData.linescore.outs;
	let batterCount = `${game.liveData.linescore.balls}-${game.liveData.linescore.strikes}`;
	let inning = game.liveData.linescore.currentInning;
	let inningState = game.liveData.linescore.inningState;
	let bases = `${game.liveData.linescore.offense.first ? 'first' : ''} ${
		game.liveData.linescore.offense.second ? 'second' : ''
	} ${game.liveData.linescore.offense.third ? 'third' : ''}`;

  // console.log(inningLinescore)

	/**
	 * @param {{ id: any; } | undefined} [player]
	 */
	function getPlayerPosition(player) {
		if (player && player.id) {
			return Object.keys(defenseLinescore).find(
				(position) => defenseLinescore[position].id === player.id
			);
		}
		return null;
	}

	getPlayerPosition();
</script>

{#if (game.liveData.plays.currentPlay)}
<div>
	<!-- <h1>{game.gamePk}</h1> -->
	<div class="w-full flex">
		<div class="w-full p-2 flex gap-4">
      <Linescore {game} {inningLinescore} />
		</div>

		{#if game.gameData.status.abstractGameCode === 'L'}
      <GameState {inning} {inningState} {numOuts} {bases} {batterCount} />
		{/if}
	</div>

  <!-- Current Matchup -->
	{#if game.gameData.status.abstractGameCode === 'L'}
		<div class="flex flex-col gap-12 md:flex-row justify-between items-center">
      <AtBat {game} {batter} {batterDetails} {batterStats} />

      <Pitching {game} {pitcher} {pitcherDetails} {pitcherStats} />
		</div>
	{/if}

	<div class="flex justify-between gap-4 pt-4">
    <!-- Away Roster -->
    <Roster {game} away={true} />

    <!-- Field -->
    <div class="flex-shrink w-full max-w-3xl mx-auto">
      <Field {defenseLinescore} />
    </div>

    <!-- Home Roster -->
		<Roster {game} home={true} />
	</div>
</div>

{:else}
<div>
  <p>Game not available</p>
</div>
{/if}

