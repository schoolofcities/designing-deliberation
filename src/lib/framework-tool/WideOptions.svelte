<script>
    import CheckCircle from "$lib/icons/CheckCircle.svelte";

    let {
        options = [
            {value: "preset", label: "Use a preset framework"},
            {value: "scratch", label: "Build a framework from scratch"}
        ],
        selected = $bindable(),
    } = $props();
</script>

<div class="options">
    {#each options as option}
        <button
            type="button"
            class="option-card"
            class:selected={selected === option.value}
            onclick={() => selected = option.value}
            aria-pressed={selected === option.value}
        >
            <p>{option.label}</p>
            <CheckCircle size={31} selected={selected === option.value}/>
        </button>
    {/each}
</div>

<style>
    .options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        max-width: 925px;
        margin-bottom: 20px;
    }

    .option-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        width: 100%;
        padding: 18px 20px;
        background-color: var(--paper);
        border: 1.5px solid var(--muted);
        border-radius: 14px;
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        transition: border-color 0.15s ease, background 0.15s ease;
        color: var(--muted);
    }

    .option-card:hover {
        border-color: #c9c4b8;
    }

    .option-card.selected {
        color: var(--pine);
        background-color: var(--selected-bg);
        border: 2px solid var(--pine);
        box-sizing: border-box;
        padding: 17px 19px;
    }

    .option-card p {
        margin: 0;
        font-weight: 600;
        font-size: 15px;
    }
</style>