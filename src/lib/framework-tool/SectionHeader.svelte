<script>
    let { 
        section, 
        recommended = [],
        max,
    } = $props();

    let description = $derived.by(() => {
        if (section == "Engagement Disposition") {
            return "Select a disposition tag. Recommended: " + recommended.join(" or ");  
        } else if (section == "Components") {
            return "Select " + (max == -1  ? "your components (no maximum)." : (max > 1 ? "up to " + max + " components." : "1 component."));
        }
    });
    let tooltip = $derived.by(() => {
        if (section == "Engagement Disposition") {
            return "Each activated tier is tagged Given (fixed input, presented for information — e.g., a statutory purpose and need), Validate (drafted by the project team, tested and refined through engagement), or Co-create (developed with the community). This tag is the bridge between the framework and the rest of the tool — it defines what is actually being engaged on.";
        } else if (section == "Components") {
            return "A named element that can occupy a tier (e.g., “Vision Statement,” “Guiding Principles,” “Big Moves”). Components within a tier are functionally interchangeable; the choice is one of tone, sector convention, and emphasis.";
        }
    });
    let tooltipShown = $state(false);
    let wrapEl = $state();

    

    function handleOutsideClick(e) {
        if (tooltipShown && wrapEl && !wrapEl.contains(e.target)) {
            tooltipShown = false;
        }
    }
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="title">
    <h2>{section}</h2>
    <span class="tooltip-wrap" bind:this={wrapEl}>
        <button class="tooltip-icon {tooltipShown ? "active" : ""}"
            onclick={() => { tooltipShown = !tooltipShown }}>
            i
        </button>
        <div class="tooltip-text {tooltipShown ? "active" : ""}">{tooltip}</div>
    </span>
</div>
<p>{description}</p>

<style>
    .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
    }

    p {
        margin: 10px 0; 
    }

    .tooltip-wrap {
        position: relative;
        display: inline-flex;
    }

    .tooltip-icon {
        font-family: BricolageGrotesque;
        background-color: var(--paper);
        color: var(--ink);
        border-radius: 100%;
        border: 2px solid var(--ink);
        width: 22px;
        height: 22px;
    }

    .tooltip-icon.active {
        background-color: var(--ink);
        color: var(--paper);
    }

    .tooltip-text {
        display: none;
        position: absolute;
        top: 0;
        left: 100%;
        margin-left: 12px;
        max-width: 300px;
        width: 80dvw;
        line-height: normal;
        background-color: white;
        border: 1px solid var(--line, #ddd);
        border-radius: 0 6px 6px 6px;
        padding: 10px 12px;
        box-sizing: border-box;
        z-index: 10;
    }

    .tooltip-text::before {
        content: "";
        position: absolute;
        top: 0;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: white;
    }

    .tooltip-text::after {
        content: "";
        position: absolute;
        top: 0;
        right: 100%;
        transform: translateX(-1px);
        border: 7px solid transparent;
        border-right-color: var(--line, #ddd);
        z-index: -1;
    }

    .tooltip-text.active {
        display: inline;
    }

    @media (max-width: 900px) {
        .tooltip-text {
            top: 100%;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
            margin-left: 0;
            margin-top: 12px;
        }

        .tooltip-text::before {
            top: auto;
            right: auto;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-right-color: transparent;
            border-bottom-color: white;
        }

        .tooltip-text::after {
            top: auto;
            right: auto;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(-1px);
            border-right-color: transparent;
            border-bottom-color: var(--line, #ddd);
        }
    }
</style>