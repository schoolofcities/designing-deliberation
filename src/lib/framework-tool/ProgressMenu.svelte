<script>
    import { slide } from 'svelte/transition';
    import { tiers } from './tiers';
    import Checkmark from '$lib/icons/Checkmark.svelte';
    import CurvedArrow from '$lib/icons/CurvedArrow.svelte';

    let {
        currentTierIndex = $bindable(0),
        progress,
    } = $props();

    const toggleTier = (index) => {
        currentTierIndex = index;
    }

    const steps = [{ type: 'mode-select', title: "Choose a Starting Point", description: "Use a preset framework template to get you started, or build a framework from scratch!" }, ...tiers.map(t => ({ type: 'tier', ...t }))];
</script>

<div class="progress-menu">
    {#each steps as tier, index}
        <div class="tier {currentTierIndex == index ? "active" : ""}">
            <button class="tier-header" onclick={() => toggleTier(index)}>
                    <h3>{String(index).padStart(2, '0')}. {tier.title}</h3>
                <div class="title-check">
                    {#if index < currentTierIndex} 
                        <Checkmark/>
                    {/if}
                    <svg
                        class="chevron"
                        class:open={currentTierIndex == index}
                        width="14" height="14" viewBox="0 0 14 14"
                    >
                        <path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </button>
            {#if (currentTierIndex == index && tier.description) || progress[index].selected.length > 0}
                <div class="tier-content" transition:slide={{ duration: 200 }}>
                    <p>{tier.description}</p>
                    {#if progress[index].selected.length > 0} 
                        <div class="selected-list">
                            <CurvedArrow/>
                            <p>
                                {progress[index].selected.join(", ")}
                            </p>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .progress-menu {
        max-width: 300px;
        width: 95dvw;
        background-color: white;
        border-radius: 20px;
        border: 2px solid var(--line);
        overflow: hidden;
        height: fit-content;
    }

    .tier {
        border-bottom: 1px solid var(--line);
    }

    .tier:last-child {
        border-bottom: none;
    }

    .tier-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 14px 16px;
        text-align: left;
        min-height: 48px;
    }

    .tier-header h3 {
        margin: 0;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: var(--muted);
    }

    .active .tier-header h3 {
        color: var(--pine);
    }

    .title-check {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
    }

    .chevron {
        flex-shrink: 0;
        color: var(--muted);
        transition: transform 0.15s ease;
    }

    .active .chevron {
        color: var(--pine);
    }

    .chevron.open {
        transform: rotate(180deg);
    }

    .tier-content {
        padding: 0 16px 16px 16px;
    }

    .tier-content p {
        margin: 0;
        font-size: 12px;
        line-height: 1.5;
        color: var(--muted, #6b6b6b);
    }

    .selected-list {
        display: grid;
        grid-template-columns: 25px auto;
    }

    .selected-list p {
        text-wrap: wrap;
    }
</style>