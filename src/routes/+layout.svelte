<script>
	import '../app.css';
</script>

<div class="mx-auto p-4 text-zinc-100">
  <div class="pb-4">
		<a href="/" class="text-4xl font-bold">❖ Gameday</a>
	</div>
  <slot />
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.zinc.950);
  }
</style>
