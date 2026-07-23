<script>
	import HeaderBar from '$lib/HeaderBar.svelte';
    import { page } from "$app/stores";
    import ResourceCard from '$lib/ResourceCard.svelte';

    let resources = $page.data.resources;

</script>


<svelte:head>

<title>Designing Deliberation - Resources</title>

</svelte:head>

<HeaderBar page="Resources"/>
<main>
	<h1>Resources</h1>
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