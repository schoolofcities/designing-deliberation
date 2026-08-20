<script>
    let {
        values = [
            "Fixed",
            "Confirm",
            "Co-create"
        ],
        selected = $bindable(),
    } = $props();
</script>

<div class="radioset">
    {#each values as value}
        <label class:sel={selected === value}><input type="radio" bind:group={selected} value={value} /> {value}</label>
    {/each}
</div>

<style>
    .radioset { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 8px; 
        margin-bottom: 20px;
    }

    .radioset label {
        border: 1px solid var(--line); 
        border-radius: 999px; 
        padding: 8px 14px; 
        cursor: pointer; 
        font-size: 14px;
        display: flex; 
        gap: 8px; 
        align-items: center; 
        background: #fff;
    }

    .radioset input { 
        accent-color: var(--pine); 
        margin: 0;
    }

    .radioset label.sel { 
        border-color: var(--pine); 
        background: #EAF3EC; 
        color: var(--pine-dk); 
        font-weight: 500; 
    }

</style>