<script>
	import HeaderBar from '$lib/HeaderBar.svelte';
    import { page } from "$app/stores";
    import ResourceCard from '$lib/ResourceCard.svelte';
    import { onMount } from 'svelte';
    import ToolCallout from '$lib/ToolCallout.svelte';
    import { userMode } from '$lib/userMode.svelte.js';
    import { use } from 'marked';


	const pageTitle = "Resources"
    let resources = $page.data.resources;

</script>


<svelte:head>

<title>Designing Deliberation - {pageTitle}</title>

</svelte:head>

<HeaderBar page={pageTitle}/>
<main>
	<h1>{pageTitle}</h1>
	{#if resources}
		{#each Object.keys(resources) as category}
			<div class="category">
				<h2>{category}</h2>
				<div class="resources-grid">
					{#each resources[category] as resource}
						<ResourceCard name={resource.Name} link={resource.Link} description={resource.Description}/>
					{/each}
				</div>
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

	h1 {
		margin-bottom: 25px;
	}
	
	h2 {
		margin-bottom: 10px;
	}

	.category {
		margin: 25px 0;
	}

	.resources-grid {
		display: flex;
		flex-direction: row;
		gap: 15px; 
	}
</style>