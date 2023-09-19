<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import '../app.css';
</script>

<div class="w-full h-full text-zinc-900 dark:text-zinc-50">
  <div class="p-4 w-full flex justify-between">
		<a href="/" class="flex gap-2 items-center text-xl lg:text-2xl">
      <img src="/gameday-logo.png" alt="Pixelated baseball bat" class="inline h-6 lg:h-8" />
      <p>Gameday</p>
    </a>
    <ThemeToggle />
	</div>
  <div class="p-4">
    <slot />
  </div>
</div>
