<script>
    let {
        tierToggled = $bindable(false),
        hasPreset,
        presetOn,
        recommendedOn,
        toggleFunction,
    } = $props();

    let statusLabel = $derived.by(() => {
        if (hasPreset) return tierToggled === presetOn ? "Preset" : "Toggled";
        return tierToggled === recommendedOn ? "Recommended" : "Toggled";
    })
</script>

<div>
    <h2>Add to framework?</h2>

    <div class="switch-container">
        <label class="switch">
            <input type="checkbox" bind:checked={tierToggled}>
            <span class="slider"></span>
        </label>
        <p class="status {tierToggled ? "active": ""}">{statusLabel + ": " + (tierToggled ? " On" : " Off")}</p>
    </div>
</div>

<style>
    .switch-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--pine);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--pine);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .status {
        text-transform: uppercase;
        color: var(--muted);
    }

    .status.active {
        color: var(--pine);
    }
</style>