<script>
    import SelectBox from '$lib/framework-tool/SelectBox.svelte';
    import CustomSelectBox from '$lib/framework-tool/CustomSelectBox.svelte';

    let {
        selected = $bindable([]),
        customComponent = $bindable(null),
        max,
        components,
        hasCustom = true,
        ordered = true
    } = $props();

    let multi = $derived(max == -1 || max > 1);

    const selectCard = (title) => {
        if (multi) {
            if (!selected) selected = [];
            if (selected.includes(title)) {
                selected = selected.filter(item => item !== title);
            } else if (max == -1 || selected.length < max) {
                selected = [...selected, title];
            }
        } else {
            selected = selected?.[0] === title ? [] : [title];
        }
    }

    const isSelected = (title) => multi
        ? !!selected?.includes(title)
        : selected?.[0] === title;

    const orderOf = (title) => {
        if (!ordered || !multi) return null;
        const i = selected?.indexOf(title) ?? -1;
        return i === -1 ? null : i + 1;
    }

    const handleCustomChange = (newValue, oldValue) => {
        const oldTitle = oldValue?.title;
        if (oldTitle && newValue?.title !== oldTitle && isSelected(oldTitle)) {
            selected = multi
                ? selected.map(t => t === oldTitle ? newValue.title : t)
                : [newValue.title];   
        }
    }

    let prevCustom = customComponent;
    $effect(() => {
        handleCustomChange(customComponent, prevCustom);
        prevCustom = customComponent;
    });
</script>

<div class="components">
    {#each components as component}
        <SelectBox
            {...component}
            multi={multi}
            selected={isSelected(component.title)}
            selectCard={selectCard}
            ordered={ordered}
            orderIndex={orderOf(component.title)}
        />
    {/each}
    {#if hasCustom}
        <CustomSelectBox
            bind:value={customComponent}
            multi={multi}
            selected={customComponent ? isSelected(customComponent.title) : false}
            selectCard={selectCard}
            ordered={ordered}
            orderIndex={customComponent ? orderOf(customComponent.title) : null}
        />
    {/if}
</div>

<style>    
    .components {
        display: flex;
        flex-direction: row;
        gap: 15px; 
        flex-wrap: wrap;
        max-width: 1000px;
        margin: 20px 0px;
    }
</style>