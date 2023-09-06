<script>
  export let game
  export let home = false;
  export let away = false;

  $: atBat = game.liveData.plays.currentPlay.matchup.batter
  // console.log(atBat)

</script>

{#if away}
<div class="flex flex-col gap-4 w-72">
	<!-- <h3 class="uppercase text-center">Away</h3> -->
	{#each game.liveData.boxscore.teams.away.battingOrder as batterId}
		<!-- Retrieve the player object using the batterId -->
		{#if game.liveData.boxscore.teams.away.players[`ID${batterId}`]}
					{@const player = game.liveData.boxscore.teams.away.players[`ID${batterId}`]}
					<div class="flex gap-2 px-2 border border-zinc-900 dark:border-zinc-100">
						<img
							src={`https://midfield.mlbstatic.com/v1/people/${batterId}/silo/180`}
							alt={player.person.fullName}
							class="w-12 h-12 lg:w-16 lg:h-16"
						/>
						<div class="flex gap-4 w-full">
							<div class="flex h-full items-center w-6">
								<p class="text-lg">{player.jerseyNumber}</p>
							</div>
							<div class="w-full flex flex-col justify-center">
								<div class="flex justify-between text-sm">
									<p>{player.position.abbreviation}</p>
									<p>{player.seasonStats.batting.avg}</p>
								</div>
								<p class="text-sm">{player.person.fullName}</p>
							</div>
						</div>
					</div>
		{/if}
	{/each}
</div>
{:else if home}
<div class="flex flex-col gap-4 w-72">
	<!-- <h3 class="uppercase text-center">Home</h3> -->
	{#each game.liveData.boxscore.teams.home.battingOrder as batterId}
	<!-- Retrieve the player object using the batterId -->
		{#if game.liveData.boxscore.teams.home.players[`ID${batterId}`]}
			{@const player = game.liveData.boxscore.teams.home.players[`ID${batterId}`]}
			<div class="flex gap-2 px-2 border border-zinc-900 dark:border-zinc-100">
				<img
					src={`https://midfield.mlbstatic.com/v1/people/${batterId}/silo/180`}
					alt={player.person.fullName}
					class="w-12 h-12 lg:w-16 lg:h-16"
				/>
				<div class="flex gap-4 w-full">
					<div class="flex h-full items-center w-6">
						<p class="text-xs">{player.jerseyNumber}</p>
					</div>
					<div class="w-full flex flex-col justify-center">
						<div class="flex justify-between text-sm">
							<p>{player.position.abbreviation}</p>
							<p>{player.seasonStats.batting.avg}</p>
						</div>
						<p class="text-sm">{player.person.fullName}</p>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
{/if}
