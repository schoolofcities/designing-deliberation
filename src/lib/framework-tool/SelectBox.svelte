<script>
    import CheckCircle from "$lib/icons/CheckCircle.svelte";
    import CheckSquare from "$lib/icons/CheckSquare.svelte";

    let {
        title,
        description,
        multi,
        selected = false,
        selectCard,
        onEdit,
    } = $props();

    const clickFunction = () => {
        selectCard(title);
    }

    const editClick = (e) => {
        e.stopPropagation();
        onEdit();
    }
</script>

<button class="card" class:selected={selected} onclick={clickFunction}>
    <div class="check-circle">
        {#if onEdit}   
            <span class="custom-component-label">Custom Component</span>
        {/if}
        {#if multi}
            <CheckSquare size={31} selected={selected}/>
        {:else}
            <CheckCircle size={31} selected={selected}/>
        {/if}
    </div>
    {#if onEdit}
        <span
            class="edit-btn"
            role="button"
            tabindex="0"
            onclick={editClick}
            onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') editClick(e); }}
        >Edit</span>
    {/if}
    <div class="card-text">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
</button>

<style>
    .card {
        width: 220px;
        height: 170px;
        color: var(--muted);
        border: 1px solid var(--muted);
        border-radius: 10px;
        background-color: var(--paper);
        position: relative;
        text-align: left;
    }

    .card:hover {
        cursor: pointer;
        background-color: var(--paper);
    }

    .card.selected {
        color: var(--pine);
        background-color: var(--selected-bg);
        border: 2px solid var(--pine);
        box-sizing: border-box;
    }

    .check-circle {
        position: absolute;
        top: 8px;
        right: 8px;
        height: 31px;
    }

    .custom-component-label {
        position: absolute;
        top: 3px;
        right: 38px;
        font-size: 10px;
        color: var(--muted);
        text-align: right;
        text-transform: uppercase;
        font-weight: 700;
    }

    .selected .custom-component-label {
        color: var(--pine);
        top: 2.5px;
        right: 37.75px;
    }

    .card-text {
        padding: 0 10px;
        /* display: grid;
        grid-template-rows: 50% 50%; */
    }

    .selected .card-text {
        padding: 0 9px;
    }

    .selected .check-circle {
        top: 7.5px;
        right: 7.5px;
    }

    h3 {
        font-size: 20px;
        padding-bottom: 2px;
        align-self: end;
        padding-right: 15px;
    }

    p {
        font-size: 14px;
        margin: 0;
    }


    .edit-btn {
        position: absolute;
        bottom: 8px;
        right: 10px;
        font-size: 14px;
        text-decoration: underline;
        font-weight: 700;
        cursor: pointer;
    }

    .selected .edit-btn {
        color: var(--pine);
        bottom: 7px;
        right: 9px;
    }

    .edit-btn:hover {
        opacity: .75;
    }
    
</style>