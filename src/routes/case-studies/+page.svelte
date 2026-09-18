<script>
	import HeaderBar from '$lib/HeaderBar.svelte';
	import TogglePanel from '$lib/icons/TogglePanel.svelte';
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import ToolCallout from '$lib/ToolCallout.svelte';
    import { userMode } from '$lib/userMode.svelte.js';

    const pageTitle = "Case Studies";
	let panelOpen = $state(true);
	let selectedIndex = $state(0);

    let scenarios = $page.data.scenarios;
    
    function goTo(index) {
        selectedIndex = index;
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>


<svelte:head>
	<title>Designing Deliberation - {pageTitle}</title>
</svelte:head>

<HeaderBar page={pageTitle}/>
<div class="shell {panelOpen ? "": "panel-closed"}">
    <nav class="rail">
        <button class="toggle-panel {panelOpen ? "open" : ""}" onclick={() => {panelOpen = !panelOpen}}>
            <TogglePanel fill={"var(--muted)"}/>
        </button>
		{#if panelOpen}
			<ul class="scenarios-list">
				{#each scenarios as scenario, index}
					<li>
						<button
							class="navitem"
							class:active={selectedIndex === index}
							onclick={() => goTo(index)}
						>
							<span style>{scenario.Title}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
    </nav>

    <main>
        <div class="scenario">
            <h2 class="title">{scenarios[selectedIndex].Title}</h2>
            {#if scenarios}
                {#each Object.keys(scenarios[selectedIndex]) as section}
                    {#if section !== "Title"}
                        <h3>{section.replaceAll("_", " ")}</h3>
                        <p>{scenarios[selectedIndex][section]}</p>
                    {/if}
                {/each}
            {/if}
        </div>
        {#if userMode.beginner}
            <ToolCallout page={pageTitle}/>
        {/if}
	</main>
</div>	


<style>
    .toggle-panel {
        margin-top: -15px;
        margin-left: -10px;
        position: absolute;
        border: none;
        background-color: #00000000;
        rotate: 0deg;
        transition: margin-left 0.3s ease-in-out;
    }

    .toggle-panel:hover {
        cursor: pointer;
    }

    .toggle-panel.open {
        margin-left: 245px; 
        rotate: 180deg;
    }
    
    .shell { 
        display: grid; grid-template-columns: 288px 1fr; min-height: calc(100vh - 56px); 
        transition: all 0.3s ease-in-out;
    }
    .shell.panel-closed {
        grid-template-columns: 25px 1fr; 
    }

    nav.rail { border-right: 1px solid var(--line); padding: 22px 16px; background: #FCFBF7; transition: all 0.3s ease-in-out; }

    .panel-closed nav.rail {
        padding: 22px 10px;
    }

	ul.scenarios-list {
		padding: 0;
	}

	.scenarios-list li {
		list-style: none;
		margin: none;
	}

    .navitem {
        display: flex; 
        gap: 10px; 
        align-items: baseline; 
        width: 100%; 
        text-align: left; 
        border: 0; 
        background: none;
        padding: 8px 10px; 
        border-radius: var(--r-sm); 
        cursor: pointer; 
        color: var(--muted); 
        font-size: 14px; 
        line-height: 1.35; 
        overflow: hidden;
        text-wrap: nowrap;
    }
    .navitem:hover { background: #F0EEE4; color: var(--ink); }
    .navitem.active { background: #E7F1E9; color: var(--pine-dk); font-weight: 600; }

	 /* ---------- Main ---------- */
    main { padding: 34px 40px 80px; max-width: 920px; }
    .scenario { animation: fade .35s ease; }
    @keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

    h2.title { font-size: 32px; margin-bottom: 15px; }

	@media (max-width: 880px) {
        .shell { grid-template-columns: 1fr; }
        nav.rail { display: none; }
        main { padding: 24px 18px 64px; }
    }
</style>