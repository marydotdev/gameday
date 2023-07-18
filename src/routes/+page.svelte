<script>
	export let data;

	let games = data.today.dates[0].games;
	// console.log(games)
	let apiUrl = 'https://statsapi.mlb.com';
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

  <div class="pb-8 flex gap-4">
    <p>Sunday</p>
    <p>Monday</p>
    <p>Tuesday</p>
    <p>Wednesday</p>
    <p>Thursday</p>
    <p>Friday</p>
    <p>Saturday</p>
  </div>

	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 text-xl">
		{#each games as game}
    <a href="/{game.gamePk}">
			<div class="flex flex-col w-52 gap-2">
				<p>
					{new Date(game.gameDate).toLocaleTimeString('en-US', {
						hour: 'numeric',
						minute: '2-digit'
					})}
				</p>
				<div class="flex justify-start gap-2">
          <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.teams.away.team.id}.svg`} alt="team logo" class="w-6 h-6" />
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
          <img src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.teams.home.team.id}.svg`} alt="team logo" class="w-6 h-6" />
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



