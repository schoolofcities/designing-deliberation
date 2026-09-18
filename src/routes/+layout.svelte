<script>
    import Footer from '$lib/Footer.svelte';
	import '../assets/global-styles.css'; 
    import { onMount } from 'svelte';
    import { loadUserMode } from '$lib/userMode.svelte.js';
    let { children } = $props();

    onMount(loadUserMode);
</script>

<div class="app">
    <main>
        {@render children()}
    </main>
    <Footer />
</div>

<style>
    .app {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
    }

    main {
        flex: 1; 
    }
</style>