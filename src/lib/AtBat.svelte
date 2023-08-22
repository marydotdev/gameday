<script>
  export let game
  export let batterDetails
  export let batter
  export let batterStats
</script>

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
