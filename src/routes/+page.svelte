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

	// async function fetchGameData(gamePk) {
	// 	try {
	// 		const response = await fetch(`${apiUrl}/api/v1.1/game/${gamePk}/feed/live`);
	// 		const gameData = await response.json();
	// 		const numOuts = gameData.liveData.linescore.outs;
	// 		const batterCount = `${gameData.liveData.linescore.balls}-${gameData.liveData.linescore.strikes}`;
	// 		let runners = [
  //       { base: 'first', runner: gameData.liveData.offense && gameData.liveData.offense.first },
  //       { base: 'second', runner: gameData.liveData.offense && gameData.liveData.offense.second },
  //       { base: 'third', runner: gameData.liveData.offense && gameData.liveData.offense.third }
  //     ];
	// 		return { numOuts, batterCount, runners };
	// 	} catch (error) {
	// 		console.error('Error fetching outs:', error);
	// 		return null;
	// 	}
	// }

	// function getRunnerName(runner) {
	// 	return runner ? runner.fullName : '';
	// }

	// onMount(async () => {
	// 	for (const game of games) {
	// 		await fetchGameData(game.gamePk);
	// 	}
	// });
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

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
		{#each allGames as game}
			<a href="/{game.gamePk}">
				<div class="flex flex-col w-56 gap-2 border-2 border-black">
					<div>
						{#if game.status.abstractGameCode === 'L'}
							<p>In Progress</p>
							<!-- Call the fetchOuts function to get the number of outs -->
							<!-- {#await fetchGameData(game.gamePk)}
								<p>Loading...</p>
							{:then { numOuts, batterCount, runners }}
								<p>Outs: {numOuts}</p>
								<p>Batter's Count: {batterCount}</p>
								{#each runners as { base, runner }}
									{#if runner}
										<p>
											Runner on {base.charAt(0).toUpperCase() + base.slice(1)} Base: {getRunnerName(
												runner
											)}
										</p>
									{/if}
								{/each}
							{:catch error}
								<p>Error fetching game data</p>
							{/await} -->
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
			</a>
		{/each}
	</div>
</div>
