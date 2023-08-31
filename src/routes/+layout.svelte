<script>
	import ThemeToggle from '$lib/ThemeToggle.svelte';
  import '../app.css';
</script>

<div class="w-full h-full text-zinc-900 dark:text-zinc-50">
  <div class="p-4 w-full flex justify-between">
		<a href="/" class="text-center text-4xl lg:text-6xl font-bold">
      <span class="">❖ Gameday</span>
    </a>
    <ThemeToggle />
	</div>
  <slot />
</div>
