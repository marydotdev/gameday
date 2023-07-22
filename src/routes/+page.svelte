<script lang="ts">
	import { onMount } from 'svelte';
	export let data: any;

	interface Game {
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
	}

	let games: Game[] = data.today.dates[0].games;
	let inProgressGames: Game[] = [];
	let upcomingGames: Game[] = [];
	let finishedGames: Game[] = [];

	games.forEach((game: Game) => {
		if (game.status.abstractGameCode === 'L') {
			inProgressGames.push(game);
		} else if (game.status.abstractGameCode === 'F') {
			finishedGames.push(game);
		} else {
			upcomingGames.push(game);
		}
	});

	// Sort the arrays based on the gameDate
	inProgressGames.sort((a: Game, b: Game) => {
		return new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime();
	});

	upcomingGames.sort((a: Game, b: Game) => {
		return new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime();
	});

	finishedGames.sort((a: Game, b: Game) => {
		return new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime();
	});

	// Concatenate the arrays in the desired order
	let allGames: Game[] = [...inProgressGames, ...upcomingGames, ...finishedGames];

	let apiUrl = 'https://statsapi.mlb.com';

	async function fetchGameData(gamePk) {
		try {
			const response = await fetch(`${apiUrl}/api/v1.1/game/${gamePk}/feed/live`);
			const gameData = await response.json();
			const numOuts = gameData.liveData.linescore.outs;
			const batterCount = `${gameData.liveData.linescore.balls}-${gameData.liveData.linescore.strikes}`;
      const inningState = gameData.liveData.linescore.inningState;
			const inning = gameData.liveData.linescore.currentInning;
			const bases = `${gameData.liveData.linescore.offense.first ? 'first' : ''} ${
				gameData.liveData.linescore.offense.second ? 'second' : ''
			} ${gameData.liveData.linescore.offense.third ? 'third' : ''}`;
			return { numOuts, batterCount, inningState, inning, bases };
		} catch (error) {
			console.error('Error fetching outs:', error);
			return null;
		}
	}

	// function getRunnerName(runner) {
	// 	return runner ? runner.fullName : '';
	// }

	// Modify the existing onMount function to fetch data for all games
	onMount(async () => {
		try {
			const gamePromises = games.map((game) => fetchGameData(game.gamePk));
			const gameDataArray = await Promise.all(gamePromises);

			// Update the allGames array with the fetched data
			allGames = allGames.map((game, index) => {
				return {
					...game,
					...(gameDataArray[index] || {}) // Merge the fetched data with the existing game object
				};
			});
		} catch (error) {
			console.error('Error fetching game data for all games', error);
		}
	});
</script>

<svelte:head>
	<title>Gameday</title>
	<meta name="description" content="Gameday" />
</svelte:head>

<div>
	<div class="pb-8">
		<h1 class="text-4xl font-bold">❖ Gameday</h1>
		<h2 class="text-xl">Today's Schedule</h2>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
		{#each allGames as game}
			<a href="/{game.gamePk}">
				<div class="flex justify-between w-full border-2 border-black">
          <div class="w-full py-2 flex flex-col justify-center gap-4 border-2 border-blue-300">
            <div class="flex justify-start gap-2">
						<img
							src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.teams.away.team.id}.svg`}
							alt="team logo"
							class="w-6 h-6"
						/>
						<div class="w-full flex justify-between">
							<div>{game.teams.away.team.name}</div>
							{#if !game.teams.away.score}
								<div>0</div>
							{:else}
								<div>{game.teams.away.score}</div>
							{/if}
						</div>
					</div>
					<div class="flex justify-start gap-2">
						<img
							src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.teams.home.team.id}.svg`}
							alt="team logo"
							class="w-6 h-6"
						/>
						<div class="w-full flex justify-between">
							<div>{game.teams.home.team.name}</div>
							{#if !game.teams.home.score}
								<div>0</div>
							{:else}
								<div>{game.teams.home.score}</div>
							{/if}
						</div>
					</div>
        </div>
					<div class="border-2 border-indigo-400 px-4 w-fit flex justify-center items-center">
						{#if game.status.abstractGameCode === 'L'}
							<!-- Call the fetchOuts function to get the number of outs -->
							{#await fetchGameData(game.gamePk)}
								<p>Loading...</p>
							{:then { numOuts, batterCount, inningState, inning, bases }}
							  <div class="flex flex-col items-center gap-2">
                  <div class="flex items-center gap-1">
                    {#if inningState === 'Top'}
                    <div class="triangle-up" />
                    {:else if inningState === 'Bottom'}
                    <div class="triangle-down" />
                    {:else if inningState === 'Middle'}
                    <div>Mid</div>
                    {:else if inningState === 'End'}
                    <div>End</div>
                    {/if}
                    <p>{inning}</p>
                  </div>
                <!-- Display the bases with filled diamonds if a runner is on each base -->
								<div class="w-10 h-7 relative">
									<div id="first" class={bases.includes('first') ? 'diamond-filled' : 'diamond'} />
									<div
										id="second"
										class={bases.includes('second') ? 'diamond-filled' : 'diamond'}
									/>
									<div id="third" class={bases.includes('third') ? 'diamond-filled' : 'diamond'} />
								</div>
								<!-- <p>Outs: {numOuts}</p> -->
                <div class="flex gap-1">
                  {#if numOuts === 1}
                  <div class="w-3 h-3 border-2 border-black bg-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black rounded-full"></div>
                  {:else if numOuts === 2}
                  <div class="w-3 h-3 border-2 border-black bg-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black bg-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black rounded-full"></div>
                  {:else if numOuts === 3}
                  <div class="w-3 h-3 border-2 border-black bg-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black bg-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black bg-black rounded-full"></div>
                  {:else}
                  <div class="w-3 h-3 border-2 border-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black rounded-full"></div>
                  <div class="w-3 h-3 border-2 border-black rounded-full"></div>
                  {/if}
                </div>
								<p>{batterCount}</p>
								<!-- <p>{bases}</p> -->
                </div>
							{:catch error}
								<p>Error fetching game data</p>
							{/await}
						{:else if game.status.abstractGameCode === 'F'}
							<p>Final</p>
						{:else}
							<p>
								{new Date(game.gameDate).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: '2-digit'
								})}
							</p>
						{/if}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.diamond, .diamond-filled {
		width: 15px;
		height: 15px;
		/* margin: 2px; */
		border: 2px solid black;
    background-color: aliceblue;
		rotate: 45deg;
	}

  .diamond-filled {
    background-color: aqua;
  }

	#first {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	#second {
    position: absolute;
    right: 33%;
	}

	#third {
    position: absolute;
		left: 0;
		bottom: 0;
	}

  .triangle-up {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 12px solid black;
    }

    .triangle-down {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 12px solid black;
    }

</style>
