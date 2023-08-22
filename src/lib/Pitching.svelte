<script>
  export let game
  export let pitcher
  export let pitcherDetails
  export let pitcherStats

</script>

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
