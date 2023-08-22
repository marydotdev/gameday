<script>
	export let game;
  export let inningLinescore
</script>

<table class="w-full flex-grow border border-black dark:border-white">
	<thead class="hidden md:table-header-group">
		<tr>
			<th class="w-0" />
			<th class="border border-black dark:border-white">1</th>
			<th class="border border-black dark:border-white">2</th>
			<th class="border border-black dark:border-white">3</th>
			<th class="border border-black dark:border-white">4</th>
			<th class="border border-black dark:border-white">5</th>
			<th class="border border-black dark:border-white">6</th>
			<th class="border border-black dark:border-white">7</th>
			<th class="border border-black dark:border-white">8</th>
			<th class="border border-black dark:border-white">9</th>
      <!-- {#if game.gameData.status.abstractGameCode === 'F'} -->
			<th class="w-16">Runs</th>
      <!-- {/if} -->
		</tr>
	</thead>
	<tbody>
		<tr class="away py-2">
			<td class="border border-black dark:border-white">
				<div class="w-fit flex items-center justify-start gap-4">
					<img
						src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
						alt="team logo"
						class="w-12 h-12 flex-shrink-0"
					/>
					<div class="w-48 md:w-64 text-left text-lg md:text-xl">{game.gameData.teams.away.name}</div>
				</div>
			</td>
			{#each inningLinescore as inning}
				<td data-th={inning.num} class="hidden md:table-cell">
					{#if !inning.away.runs}
						0
					{:else}
						{inning.away.runs}
					{/if}
				</td>
			{/each}
			<!-- {#if game.gameData.status.abstractGameCode === 'F'} -->
				<td data-th="Final" class="border border-black dark:border-white">{game.liveData.linescore.teams.away.runs}</td>
			<!-- {/if} -->
		</tr>
		<tr class="home py-2">
			<td class="border border-black dark:border-white">
				<div class="w-fit flex items-center justify-start gap-4">
					<img
						src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.home.id}.svg`}
						alt="team logo"
						class="w-12 h-12 flex-shrink-0"
					/>
					<div class="w-36 md:w-64 text-left text-lg md:text-xl">{game.gameData.teams.home.name}</div>
				</div>
			</td>
			{#each inningLinescore as inning}
				<td data-th={inning.num} class="hidden md:table-cell">
					{#if !inning.home.runs}
						0
					{:else}
						{inning.home.runs}
					{/if}
				</td>
			{/each}
			<!-- {#if game.gameData.status.abstractGameCode === 'F'} -->
				<td data-th="Final" class="border border-black dark:border-white">{game.liveData.linescore.teams.home.runs}</td>
			<!-- {/if} -->
		</tr>
	</tbody>
</table>

<style lang="postcss">
	th {
		display: table-cell;
		vertical-align: inherit;
		font-weight: normal;
		text-align: center;
	}

	td {
		padding: 10px 0px;
    text-align: center;
	}
</style>
