<script>
	import ThemeToggle from '$lib/ThemeToggle.svelte';
  import '../app.css';
</script>

<div class="w-full h-full text-zinc-900 dark:text-zinc-50">
  <div class="p-4 w-full flex justify-between">
		<a href="/" class="text-center text-xl lg:text-2xl">
      <span>Gameday</span>
    </a>
    <ThemeToggle />
	</div>
  <div class="p-4">
    <slot />
  </div>
</div>
