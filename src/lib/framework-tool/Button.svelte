<script>
    let {
        disabled,
        type = "continue",
        clickFunction = () => {},
    } = $props();

    const handleClick = () => {
        if (!disabled) {
            clickFunction();
        }
    };
</script>

<button onclick={handleClick} disabled={disabled} class="{type}">
    {type}
</button>

<style>
    button {
        text-transform: capitalize;
        background-color: var(--pine);
        color: white;
        font-family: NunitoSans, sans-serif;
        font-weight: 700;
        padding: 5px 15px;
        font-size: 20px;
        border-radius: 50px;
        border: none;
    }

    button:hover {
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    .back {
        background-color: var(--paper);
        color: var(--pine);
        border: 1px solid var(--pine);
    }
</style>