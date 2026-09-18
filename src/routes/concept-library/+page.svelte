<script>
	import HeaderBar from '$lib/HeaderBar.svelte';
    import { page } from "$app/stores";
    import ToolCallout from '$lib/ToolCallout.svelte';
    import { userMode } from '$lib/userMode.svelte.js';

    let concepts = $page.data.concepts;
	let pageTitle = "Concept Library";

</script>


<svelte:head>

<title>Designing Deliberation - Concept Library</title>

</svelte:head>

<HeaderBar page={pageTitle}/>
<main class="shell">
	<h1>{pageTitle}</h1>
	{#if concepts}
		{#each Object.keys(concepts) as letter}
			<div class="concept">
				<h2>{letter}</h2>
				{#each concepts[letter] as concept}
					<div class="concept-entry">
						<h3 class="concept-term">{concept.Term}</h3>
						<p class="concept-definition">{concept.Definition}</p>
					</div>
				{/each}
			</div>
		{/each}
	{/if}
	{#if userMode.beginner}
		<ToolCallout page={pageTitle}/>
	{/if}
</main>

<style>
	main {
		padding: 34px 40px 80px;
		max-width: 920px;
	}

	.concept {
		margin-top: 20px;
		margin-bottom: 50px;
	}

	.concept-entry {
		margin-left: 100px;
		margin-bottom: 15px;
		display: grid;
		grid-template-columns: 0.25fr 1fr;
	}

	p.concept-definition {
		margin: 0;
	}
</style>