<script>
	import AtBat from '$lib/components/AtBat.svelte';
  import Field from '$lib/components/Field.svelte';
	import GameState from '$lib/components/GameState.svelte';
	import Roster from '$lib/components/Roster.svelte';

	export let data;
	const { game } = data;

  const teams = game?.gameData?.teams ?? {};

  const gameState = game?.gameData?.status?.abstractGameCode ?? "";

  const currentPlay = game?.liveData?.plays?.currentPlay?.matchup ?? {};
  const batter = currentPlay?.batter ?? {};
  const pitcher = currentPlay?.pitcher ?? {};

  const homePlayers = game?.liveData?.boxscore?.teams?.home?.players ?? {};
  const awayPlayers = game?.liveData?.boxscore?.teams?.away?.players ?? {};

  const batterTeam = homePlayers[`ID${batter?.id}`] ? 'home' : 'away';
  const pitcherTeam = homePlayers[`ID${pitcher?.id}`] ? 'home' : 'away';

  const batterStats = homePlayers[`ID${batter?.id}`]?.seasonStats?.batting ?? {};
  const pitcherStats = awayPlayers[`ID${pitcher?.id}`]?.seasonStats?.pitching ?? {};

  const batterDetails = homePlayers[`ID${batter?.id}`] ?? {};
  const pitcherDetails = awayPlayers[`ID${pitcher?.id}`] ?? {};

  const linescore = game?.liveData?.linescore ?? {};
  let inningLinescore = linescore?.innings ?? {};
  let defenseLinescore = linescore?.defense ?? {};
  let numOuts = linescore?.outs ?? 0;
  let batterCount = `${linescore?.balls ?? 0}-${linescore?.strikes ?? 0}`;
  let inning = linescore?.currentInning ?? 0;
  let inningState = linescore?.inningState ?? "";
  let bases = `${linescore?.offense?.first ? 'first' : ''} ${
    linescore?.offense?.second ? 'second' : ''
  } ${linescore?.offense?.third ? 'third' : ''}`;
  let awayScore = linescore?.teams?.away?.runs ?? 0;
  let homeScore = linescore?.teams?.home?.runs ?? 0;

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


{#if (game.liveData.plays.currentPlay && gameState === "L")}
  <div class="p-4">
    <div class="flex">
      <!-- <div>
        {#if game.gameData.status.abstractGameCode === 'L'}
          <div class="flex flex-col gap-12 md:flex-row justify-between items-center">
            <AtBat {game} {batter} {batterDetails} {batterStats} />
          </div>
        {/if}
      </div> -->
      <div class="flex gap-4 ml-auto">
        <div class="w-full py-2 flex flex-col justify-center gap-4">
          <div class="flex items-center justify-start gap-2">
            <img
              src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
              alt="team logo"
              class="w-6 h-6 flex-shrink-0"
            />
            <div class="flex items-center gap-6 text-left">
              <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.away.name}</div> -->
              <div class="w-16">{game.gameData.teams.away.abbreviation}</div>
              {#if game.gameData.status.abstractGameCode === 'P'}
              <div></div>
              {:else}
              <div>
                {#if !awayScore}
                <div>0</div>
                {:else}
                <div>{awayScore}</div>
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
            <div class="flex items-center gap-6 text-left">
              <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.home.name}</div> -->
              <div class="w-16">{game.gameData.teams.home.abbreviation}</div>
              {#if game.gameData.status.abstractGameCode === 'P'}
              <div></div>
              {:else}
              <div>
                {#if !homeScore}
                <div>0</div>
                {:else}
                <div>{homeScore}</div>
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
    </div>

    <div class="pt-12 flex flex-col gap-12 md:grid md:grid-cols-3 md:gap-4">
      <div class="mx-auto md:col-span-1">
        {#if inningState === 'Top'}
        <!-- Away Roster -->
        <Roster {game} away={true} />
        {:else if inningState === 'Bottom'}
        <!-- Home Roster -->
        <Roster {game} home={true} />
        {/if}
      </div>
      <!-- Field -->
      <div class="w-full max-w-xl mx-auto md:col-span-2">
        <Field {defenseLinescore} />
      </div>
    </div>
  </div>
{:else if (gameState === "F")}
  <div class="flex flex-col gap-4">
    <div>
      <p class="uppercase text-xl">Final</p>
    </div>
    <div class="py-2 flex flex-col justify-center gap-4">
      <div class="flex items-center justify-start gap-2">
            <img
              src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
              alt="team logo"
              class="w-6 h-6 flex-shrink-0"
            />
            <div class="flex items-center gap-6 text-left">
              <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.away.name}</div> -->
              <div class="w-64">{game.gameData.teams.away.name}</div>
              {#if game.gameData.status.abstractGameCode === 'P'}
              <div></div>
              {:else}
              <div>
                {#if !awayScore}
                <div>0</div>
                {:else}
                <div>{awayScore}</div>
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
            <div class="flex items-center gap-6 text-left">
              <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.home.name}</div> -->
              <div class="w-64">{game.gameData.teams.home.name}</div>
              {#if game.gameData.status.abstractGameCode === 'P'}
              <div></div>
              {:else}
              <div>
                {#if !homeScore}
                <div>0</div>
                {:else}
                <div>{homeScore}</div>
                {/if}
              </div>
              {/if}
            </div>
          </div>
    </div>
    <div>
      <div>
        <p>W: {game.liveData.decisions.winner.fullName}</p>
      </div>
      <div>
        <p>L: {game.liveData.decisions.loser.fullName}</p>
      </div>
    </div>
  </div>
{:else if (gameState === "P")}
  <div class="flex flex-col gap-4">
    <div>
      <p class="uppercase">Preview</p>
    </div>
    <div class="py-2 flex flex-col justify-center gap-4">
      <div class="flex items-center justify-start gap-2">
            <img
              src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
              alt="team logo"
              class="w-6 h-6 flex-shrink-0"
            />
            <div class="flex items-center gap-6 text-left text-xs md:text-sm">
              <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.away.name}</div> -->
              <div class="w-full">{game.gameData.teams.away.name}</div>
              {#if game.gameData.status.abstractGameCode === 'P'}
              <div></div>
              {:else}
              <div>
                {#if !awayScore}
                <div>0</div>
                {:else}
                <div>{awayScore}</div>
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
            <div class="flex items-center gap-6 text-left text-xs md:text-sm">
              <!-- <div class="w-48 text-left text-lg md:text-xl">{game.gameData.teams.home.name}</div> -->
              <div class="w-full">{game.gameData.teams.home.name}</div>
              {#if game.gameData.status.abstractGameCode === 'P'}
              <div></div>
              {:else}
              <div>
                {#if !homeScore}
                <div>0</div>
                {:else}
                <div>{homeScore}</div>
                {/if}
              </div>
              {/if}
            </div>
          </div>
    </div>
    <div>

    </div>
  </div>
{:else}
  <div>
    <p>Game not available</p>
  </div>
{/if}

