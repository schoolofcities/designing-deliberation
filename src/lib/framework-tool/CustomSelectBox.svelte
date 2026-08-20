<script>
    import SelectBox from '$lib/framework-tool/SelectBox.svelte';
    let {
        value = $bindable(null), // {title, description} or null
        selected = false,
        multi,
        selectCard,
    } = $props();

    let editing = $state(false);
    let draftTitle = $state("");
    let draftDescription = $state("");

    const startEditing = () => {
        draftTitle = value?.title ?? "";
        draftDescription = value?.description ?? "";
        editing = true;
    }

    const cardClick = () => {
        if (!value) {
            startEditing();
        } else {
            selectCard(value.title);
        }
    }

    const save = (e) => {
        e.stopPropagation();
        if (!draftTitle.trim()) return;
        const wasNew = !value;
        value = { title: draftTitle.trim(), description: draftDescription.trim() };
        editing = false;
        if (wasNew) selectCard(value.title);
    }

    const cancel = (e) => {
        e.stopPropagation();
        editing = false;
    }
</script>

{#if editing}
    <div class="card editing">
        <input bind:value={draftTitle} placeholder="Title *" class="text-input"/>
        <textarea bind:value={draftDescription} placeholder="Description (Optional)" class="text-input"></textarea>
        <div class="actions">
            <button onclick={save} class="save edit-button">Save</button>
            <button onclick={cancel} class="cancel edit-button">Cancel</button>
        </div>
    </div>
{:else if value}
    <SelectBox
        title={value.title}
        description={value.description}
        multi={multi}
        selected={selected}
        selectCard={selectCard}
        onEdit={startEditing}
    />
{:else}
    <button class="card empty" onclick={cardClick}>
        <svg viewBox="0 0 24 24" height={40} width={40} fill="var(--muted)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"></path> </g></svg>
        <p class="description">Add a custom <br/> component</p>
    </button>
{/if}

<style>
    .card {
        width: 220px;
        height: 170px;
        border: 1px dashed var(--muted);
        border-radius: 10px;
        background-color: var(--paper);
        box-sizing: border-box;
        padding: 10px;
    }
    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--muted);
        cursor: pointer;
        gap: 10px;
    }
    .editing {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .editing textarea {
        flex: 1;
        resize: none;
    }
    .actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
    }
    .text-input {
        font-family: 'Nunito Sans', sans-serif;
        color: var(--muted);
        font-size: 12px;
        font-weight: 500;
    }

    p {
        margin: 0;
        font-size: 14px;
    }

    .description {
        font-style: italic;
    }

    .edit-button {
        font-weight: 700;
        padding: 2px 10px;
        border-radius: 50px;
    }

    .edit-button.save {
        background-color: var(--muted);
        border: none;
        color: var(--paper);
    }

    .edit-button.cancel {
        border: 2px solid var(--muted);
        box-sizing: border-box;
        background-color: var(--paper);
        color: var(--muted);
    }
    
</style>