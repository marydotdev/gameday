<script>
  export let inning
  export let inningState
  export let bases
  export let numOuts
  export let batterCount

</script>

<div class="px-4 w-full flex justify-center items-center">
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
	</div>
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

</style>
