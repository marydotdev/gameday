<script>
	import AtBat from '$lib/AtBat.svelte';
  import Field from '$lib/Field.svelte';
	import GameState from '$lib/GameState.svelte';
	import Pitching from '$lib/Pitching.svelte';
	import Roster from '$lib/Roster.svelte';
	import Linescore from '$lib/Linescore.svelte';
	import Score from '$lib/Score.svelte';

	export let data;
	const { game } = data;

  const teams = game.gameData.teams

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

  console.log(teams)

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
	<div class="flex justify-between">
    <!-- <h1>{game.gamePk}</h1> -->
    <div class="w-48 flex border border-black">
      <div class="w-full py-2 flex flex-col justify-center gap-4 border-r-2 border-black">
        <div class="flex items-center justify-start gap-2">
          <img
            src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
            alt="team logo"
            class="w-6 h-6 flex-shrink-0"
          />
          <div class="flex items-center gap-6 text-left text-lg md:text-xl">
            <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.away.name}</div> -->
            <div class="">{game.gameData.teams.away.abbreviation}</div>
            {#if game.gameData.status.abstractGameCode === 'P'}
            <div></div>
            {:else}
            <div>
              {#if !game.gameData.teams.away.score}
              <div>0</div>
              {:else}
              <div>{game.gameData.teams.away.score}</div>
              {/if}
            </div>
            {/if}
          </div>
        </div>
        <div class="flex items-center justify-start gap-2">
          <img
            src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.home.id}.svg`}
            alt="team logo"
            class="w-6 h-6 flex-shrink-0"
          />
          <div class="flex items-center gap-6 text-left text-lg md:text-xl">
            <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.home.name}</div> -->
            <div class="">{game.gameData.teams.home.abbreviation}</div>
            {#if game.gameData.status.abstractGameCode === 'P'}
            <div></div>
            {:else}
            <div>
              {#if !game.gameData.teams.home.score}
              <div>0</div>
              {:else}
              <div>{game.gameData.teams.home.score}</div>
              {/if}
            </div>
            {/if}
          </div>
        </div>
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
  </div>

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

