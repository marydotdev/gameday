<script>
	export let data;
	const { game } = data;

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

	// const pitcherStats = game.liveData.stats.players[pitcher.id];
	//game.liveData.boxscore.teams.away.players[`ID${batterId}`]}

	let inningLinescore = game.liveData.linescore.innings;

	let defenseLinescore = game.liveData.linescore.defense;
	let numOuts = game.liveData.linescore.outs;
	let batterCount = `${game.liveData.linescore.balls}-${game.liveData.linescore.strikes}`;
	let inning = game.liveData.linescore.currentInning;
	let inningState = game.liveData.linescore.inningState;
	let bases = `${game.liveData.linescore.offense.first ? 'first' : ''} ${
		game.liveData.linescore.offense.second ? 'second' : ''
	} ${game.liveData.linescore.offense.third ? 'third' : ''}`;

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

<div>
	<!-- <h1>{game.gamePk}</h1> -->
	<div class="w-full flex">
		<div class="w-full p-2 flex gap-4 bg-zinc-900">
			<!-- <div class="w-fit flex flex-col gap-4">
				<div class="w-full flex items-center justify-start gap-4">
					<img
						src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
						alt="team logo"
						class="w-12 h-12 flex-shrink-0"
					/>
					<div class="w-48">{game.gameData.teams.away.name}</div>
				</div>
				<div class="flex items-center justify-start gap-4">
					<img
						src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.home.id}.svg`}
						alt="team logo"
						class="w-12 h-12 flex-shrink-0"
					/>
					<div>{game.gameData.teams.home.name}</div>
				</div>
			</div> -->
			<table class="w-full flex-grow">
				<thead class="hidden md:table-header-group">
					<tr>
						<th class="w-0" />
						<th>1</th>
						<th>2</th>
						<th>3</th>
						<th>4</th>
						<th>5</th>
						<th>6</th>
						<th>7</th>
						<th>8</th>
						<th>9</th>
						<th class="w-16">Final</th>
					</tr>
				</thead>
				<tbody>
					<tr class="away py-2">
						<td>
							<div class="w-fit flex items-center justify-start gap-4">
								<img
									src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.away.id}.svg`}
									alt="team logo"
									class="w-12 h-12 flex-shrink-0"
								/>
								<div class="w-64">{game.gameData.teams.away.name}</div>
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
						{#if game.gameData.status.abstractGameCode === 'F'}
							<td data-th="Final">{game.liveData.linescore.teams.away.runs}</td>
						{/if}
					</tr>
					<tr class="home py-2">
						<td>
							<div class="w-fit flex items-center justify-start gap-4">
								<img
									src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${game.gameData.teams.home.id}.svg`}
									alt="team logo"
									class="w-12 h-12 flex-shrink-0"
								/>
								<div class="w-64">{game.gameData.teams.home.name}</div>
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
						{#if game.gameData.status.abstractGameCode === 'F'}
							<td data-th="Final">{game.liveData.linescore.teams.home.runs}</td>
						{/if}
					</tr>
				</tbody>
			</table>
		</div>

		{#if game.gameData.status.abstractGameCode === 'L'}
			<div class="bg-zinc-900 px-4 w-fit flex justify-center items-center">
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
						<div id="second" class={bases.includes('second') ? 'diamond-filled' : 'diamond'} />
						<div id="third" class={bases.includes('third') ? 'diamond-filled' : 'diamond'} />
					</div>
					<!-- <p>Outs: {numOuts}</p> -->
					<div class="flex gap-1">
						{#if numOuts === 1}
							<div class="w-3 h-3 border-2 border-zinc-300 bg-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 rounded-full" />
						{:else if numOuts === 2}
							<div class="w-3 h-3 border-2 border-zinc-300 bg-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 bg-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 rounded-full" />
						{:else if numOuts === 3}
							<div class="w-3 h-3 border-2 border-zinc-300 bg-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 bg-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 bg-zinc-300 rounded-full" />
						{:else}
							<div class="w-3 h-3 border-2 border-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 rounded-full" />
							<div class="w-3 h-3 border-2 border-zinc-300 rounded-full" />
						{/if}
					</div>
					<p>{batterCount}</p>
					<!-- <p>{bases}</p> -->
				</div>
			</div>
		{/if}
	</div>

	{#if game.gameData.status.abstractGameCode === 'L'}
		<div class="flex flex-col gap-12 md:flex-row justify-between items-center bg-zinc-900">
			<div>
				<p class="uppercase text-center">At Bat</p>
				<div class="flex items-center gap-8 sm:gap-16 md:gap-8">
					<img
						src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.batter.id}/silo/180`}
						alt={game.liveData.plays.currentPlay.matchup.batter.fullName}
						class="w-36 h-36"
					/>
					<div>
						<div class="flex gap-2 items-center">
							<p>{batterDetails.jerseyNumber}</p>
							<p>{batter.fullName}</p>
						</div>
						<div>
							<p>{batterDetails.position.abbreviation}</p>
						</div>
						<div class="flex gap-4">
							<p>{batterStats.avg} AVG</p>
							<p>{batterStats.ops} OPS</p>
						</div>
						<div class="flex gap-4">
							<p>{batterStats.rbi} RBI</p>
							<p>{batterStats.homeRuns} HR</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<p class="uppercase text-center">Pitching</p>
				<div class="flex items-center gap-8 sm:gap-16 md:gap-8">
					<div>
						<div class="flex gap-2 items-center">
							<p>{pitcherDetails.jerseyNumber}</p>
							<p>{pitcher.fullName}</p>
						</div>
						<p>{pitcherStats.wins} - {pitcherStats.losses}</p>
						<p>{pitcherStats.era} ERA</p>
						<p>{pitcherStats.strikeOuts} Strikeouts</p>
					</div>
					<img
						src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.pitcher.id}/silo/180`}
						alt={game.liveData.plays.currentPlay.matchup.pitcher.fullName}
						class="w-36 h-36"
					/>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex justify-between gap-4 pt-4">
		<div class="hidden flex-shrink-0 lg:flex lg:flex-col gap-4 w-72">
			<h3 class="uppercase text-center">Away</h3>
			{#each game.liveData.boxscore.teams.away.battingOrder as batterId}
				<!-- Retrieve the player object using the batterId -->
				{#if game.liveData.boxscore.teams.away.players[`ID${batterId}`]}
					{@const player = game.liveData.boxscore.teams.away.players[`ID${batterId}`]}
					<div class="flex gap-2 bg-zinc-900 px-2">
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
								<p class="text-xl">{player.person.fullName}</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="flex-shrink w-full max-w-3xl mx-auto">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 794 771"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="Field">
					<path
						id="Union"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M497.484 635.442C500.421 645.111 502 655.371 502 666C502 723.99 454.99 771 397 771C339.01 771 292 723.99 292 666C292 657.217 293.078 648.685 295.11 640.531L0 307.5C0 -102.5 794 -102.5 794 307.5L497.484 635.442Z"
						fill="none"
						stroke="currentColor"
					/>
					<path
						id="Outfield"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M153.918 481.196C169.068 360.427 272.123 267 397 267C520.832 267 623.207 358.871 639.684 478.172L794 307.5C794 -102.5 0 -102.5 0 307.5L153.918 481.196Z"
						fill="none"
						stroke="currentColor"
					/>
					<path
						id="Infield"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M397.071 383.518C405.203 383.518 412.768 381.091 419.081 376.921C422.757 374.492 427.774 374.418 430.89 377.534L504.609 451.253C507.725 454.369 507.651 459.385 505.222 463.062C501.052 469.375 498.625 476.939 498.625 485.071C498.625 493.131 501.009 500.633 505.111 506.911C507.511 510.584 507.569 515.573 504.467 518.675L430.675 592.467C427.573 595.569 422.584 595.511 418.911 593.111C412.633 589.009 405.131 586.624 397.071 586.624C388.94 586.624 381.375 589.052 375.062 593.222C371.385 595.651 366.369 595.725 363.253 592.609L289.534 518.89C286.418 515.774 286.492 510.757 288.92 507.081C293.091 500.768 295.518 493.203 295.518 485.071C295.518 476.867 293.047 469.24 288.809 462.893C286.35 459.213 286.261 454.169 289.391 451.039L363.039 377.391C366.169 374.261 371.213 374.35 374.893 376.809C381.24 381.047 388.867 383.518 397.071 383.518Z"
						fill="none"
						stroke="currentColor"
					/>
					<rect
						id="Secondbase"
						x="397"
						y="321"
						width="28.2843"
						height="28.2843"
						rx="5.65685"
						transform="rotate(45 397 321)"
						fill="none"
						stroke="currentColor"
					/>
					<rect
						id="Homeplate"
						x="397"
						y="626"
						width="28.2843"
						height="28.2843"
						rx="5.65684"
						transform="rotate(45 397 626)"
						fill="none"
						stroke="currentColor"
					/>
					<rect
						id="Thirdbase"
						x="244"
						y="465"
						width="28.2843"
						height="28.2843"
						rx="5.65685"
						transform="rotate(45 244 465)"
						fill="none"
						stroke="currentColor"
					/>
					<rect
						id="Firstbase"
						x="550"
						y="465"
						width="28.2843"
						height="28.2843"
						rx="5.65685"
						transform="rotate(45 550 465)"
						fill="none"
						stroke="currentColor"
					/>
					<rect id="pitcher" x="357" y="445" width="80" height="80" />
					<rect id="catcher" x="357" y="668" width="80" height="80" />
					<rect id="first" x="510" y="379" width="80" height="80" />
					<rect id="second" x="467" y="289" width="80" height="80" />
					<rect id="shortstop" x="269" y="289" width="80" height="80" />
					<rect id="third" x="204" y="379" width="80" height="80" />
					<rect id="left" x="106" y="224" width="80" height="80" />
					<rect id="center" x="357" y="108" width="80" height="80" />
					<rect id="right" x="630" y="224" width="80" height="80" />
				</g>

				<g class="group">
          <image
					  href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.pitcher.id}/silo/180"
					  id="pitcher"
					  x="357"
					  y="445"
					  width="80"
					  height="80"
				  />
          <text
            x="345"
            y="550"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.pitcher.fullName}</text
          >
        </g>
				<g class="group">
          <image
					  href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.catcher.id}/silo/180"
					  id="catcher"
					  x="357"
					  y="640"
					  width="80"
					  height="80"
				  />
          <text
					  y="740"
					  x="350"
					  fill="white"
					  class="hidden group-hover:block text-white">{defenseLinescore.catcher.fullName}</text
				  >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.first.id}/silo/180"
            id="first"
            x="510"
            y="379"
            width="80"
            height="80"
          />
          <text
            x="500"
            y="480"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.first.fullName}</text
          >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.second.id}/silo/180"
            id="second"
            x="467"
            y="289"
            width="80"
            height="80"
          />
          <text
            x="455"
            y="390"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.second.fullName}</text
          >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.shortstop.id}/silo/180"
            id="shortstop"
            x="269"
            y="289"
            width="80"
            height="80"
          />
          <text
            x="260"
            y="390"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.shortstop.fullName}</text
          >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.third.id}/silo/180"
            id="third"
            x="204"
            y="379"
            width="80"
            height="80"
          />
          <text
            x="204"
            y="480"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.third.fullName}</text
          >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.left.id}/silo/180"
            id="left"
            x="106"
            y="224"
            width="80"
            height="80"
          />
          <text
            x="100"
            y="320"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.left.fullName}</text
          >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.center.id}/silo/180"
            id="center"
            x="357"
            y="108"
            width="80"
            height="80"
          />
          <text
            x="340"
            y="210"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.center.fullName}</text
          >
        </g>
				<g class="group">
          <image
            href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.right.id}/silo/180"
            id="right"
            x="630"
            y="224"
            width="80"
            height="80"
          />
          <text
            x="625"
            y="320"
            fill="white"
            class="hidden group-hover:block text-white">{defenseLinescore.right.fullName}</text
          >
        </g>
			</svg>
		</div>

		<div class="hidden flex-shrink-0 lg:flex lg:flex-col gap-4 w-72">
			<h3 class="uppercase text-center">Home</h3>
			{#each game.liveData.boxscore.teams.home.battingOrder as batterId}
				<!-- Retrieve the player object using the batterId -->
				{#if game.liveData.boxscore.teams.home.players[`ID${batterId}`]}
					{@const player = game.liveData.boxscore.teams.home.players[`ID${batterId}`]}
					<div class="flex gap-2 bg-zinc-900 px-2">
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
								<p class="text-xl">{player.person.fullName}</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<!-- <div class="flex gap-2">
		<p>{inningState}</p>
		<p>{inning}</p>
	</div>

	<div class="flex gap-2">
		<p>{batterCount}</p>
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
	</div> -->
</div>

<style lang="postcss">
	.diamond,
	.diamond-filled {
		width: 15px;
		height: 15px;
		/* margin: 2px; */
		border: 2px solid theme(colors.zinc.300);
		background-color: theme(colors.zinc.700);
		rotate: 45deg;
	}

	.diamond-filled {
		background-color: theme(colors.zinc.100);
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
		border-bottom: 12px solid theme(colors.zinc.300);
	}

	.triangle-down {
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 12px solid theme(colors.zinc.300);
	}

	th {
		display: table-cell;
		vertical-align: inherit;
		font-weight: normal;
		text-align: left;
	}

	td {
		padding: 10px 0px;
	}
</style>
