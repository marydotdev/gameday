<script>
	export let data;
	const { game } = data;

	let defenseLinescore = game.liveData.linescore.defense;
  let offenseLinescore = game.liveData.linescore.offense;

	/**
	 * @param {{ id: any; } | undefined} [player]
	 */
	function getPlayerPosition(player) {
		if (player && player.id) {
			return Object.keys(defenseLinescore).find((position) => defenseLinescore[position].id === player.id);
		}
		return null;
	}

	getPlayerPosition();
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

	<div class="flex justify-between">
    <div class="">
      <img
        src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.batter.id}/silo/180`}
        alt={game.liveData.plays.currentPlay.matchup.batter.fullName}
        class="w-36 h-36"
      />
      <p>{game.liveData.plays.currentPlay.matchup.batter.fullName}</p>
    </div>
    <div class="">
      <img
        src={`https://midfield.mlbstatic.com/v1/people/${game.liveData.plays.currentPlay.matchup.pitcher.id}/silo/180`}
        alt={game.liveData.plays.currentPlay.matchup.pitcher.fullName}
        class="w-36 h-36"
      />
      <p>{game.liveData.plays.currentPlay.matchup.pitcher.fullName}</p>
    </div>
  </div>

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

	<!-- <div class="baseball-diamond">
		<div class="base pitcher">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.pitcher.id}/silo/180`}
				alt={linescore.pitcher.fullName}
			/>
		</div>
		<div class="base catcher">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.catcher.id}/silo/180`}
				alt={linescore.catcher.fullName}
			/>
		</div>
		<div class="base first-base">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.first.id}/silo/180`}
				alt={linescore.first.fullName}
			/>
		</div>
		<div class="base second-base">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.second.id}/silo/180`}
				alt={linescore.second.fullName}
			/>
		</div>
		<div class="base third-base">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.third.id}/silo/180`}
				alt={linescore.third.fullName}
			/>
		</div>
		<div class="base shortstop">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.shortstop.id}/silo/180`}
				alt={linescore.shortstop.fullName}
			/>
		</div>
		<div class="base left-field">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.left.id}/silo/180`}
				alt={linescore.left.fullName}
			/>
		</div>
		<div class="base center-field">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.center.id}/silo/180`}
				alt={linescore.center.fullName}
			/>
		</div>
		<div class="base right-field">
			<img
				src={`https://midfield.mlbstatic.com/v1/people/${linescore.right.id}/silo/180`}
				alt={linescore.right.fullName}
			/>
		</div>
	</div> -->

	<div>
		<svg
			width="794"
			height="771"
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
					fill="#FFBD80"
				/>
				<path
					id="Outfield"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M153.918 481.196C169.068 360.427 272.123 267 397 267C520.832 267 623.207 358.871 639.684 478.172L794 307.5C794 -102.5 0 -102.5 0 307.5L153.918 481.196Z"
					fill="#559C49"
				/>
				<path
					id="Infield"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M397.071 383.518C405.203 383.518 412.768 381.091 419.081 376.921C422.757 374.492 427.774 374.418 430.89 377.534L504.609 451.253C507.725 454.369 507.651 459.385 505.222 463.062C501.052 469.375 498.625 476.939 498.625 485.071C498.625 493.131 501.009 500.633 505.111 506.911C507.511 510.584 507.569 515.573 504.467 518.675L430.675 592.467C427.573 595.569 422.584 595.511 418.911 593.111C412.633 589.009 405.131 586.624 397.071 586.624C388.94 586.624 381.375 589.052 375.062 593.222C371.385 595.651 366.369 595.725 363.253 592.609L289.534 518.89C286.418 515.774 286.492 510.757 288.92 507.081C293.091 500.768 295.518 493.203 295.518 485.071C295.518 476.867 293.047 469.24 288.809 462.893C286.35 459.213 286.261 454.169 289.391 451.039L363.039 377.391C366.169 374.261 371.213 374.35 374.893 376.809C381.24 381.047 388.867 383.518 397.071 383.518Z"
					fill="#559C49"
				/>
				<rect
					id="Secondbase"
					x="397"
					y="321"
					width="28.2843"
					height="28.2843"
					rx="5.65685"
					transform="rotate(45 397 321)"
					fill="#FFF6ED"
				/>
				<rect
					id="Homeplate"
					x="397"
					y="626"
					width="28.2843"
					height="28.2843"
					rx="5.65684"
					transform="rotate(45 397 626)"
					fill="#FFF6ED"
				/>
				<rect
					id="Thirdbase"
					x="244"
					y="465"
					width="28.2843"
					height="28.2843"
					rx="5.65685"
					transform="rotate(45 244 465)"
					fill="#FFF6ED"
				/>
				<rect
					id="Firstbase"
					x="550"
					y="465"
					width="28.2843"
					height="28.2843"
					rx="5.65685"
					transform="rotate(45 550 465)"
					fill="#FFF6ED"
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

			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.pitcher.id}/silo/180"
				id="pitcher"
				x="357"
				y="445"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.catcher.id}/silo/180"
				id="catcher"
				x="357" y="668"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.first.id}/silo/180"
				id="first"
				x="510"
				y="379"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.second.id}/silo/180"
				id="second"
				x="467"
				y="289"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.shortstop.id}/silo/180"
				id="shortstop"
				x="269"
				y="289"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.third.id}/silo/180"
				id="third"
				x="204"
				y="379"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.left.id}/silo/180"
				id="left"
				x="106"
				y="224"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.center.id}/silo/180"
				id="center"
				x="357"
				y="108"
				width="80"
				height="80"
			/>
			<image
				href="https://midfield.mlbstatic.com/v1/people/{defenseLinescore.right.id}/silo/180"
				id="right"
				x="630"
				y="224"
				width="80"
				height="80"
			/>
		</svg>
	</div>

	<a href="/">back</a>
</div>
