<script>
    let {
        question = "Why now? Why this?",
    } = $props();
</script>

<div class="question-box">
    <span class="question-label">Functional Question</span>
    <span class="question-text">{question}</span>
</div>

<style>
    .question-box {
        border-radius: 12px;
        max-width: 50dvw;
        border: 2px solid var(--line);
        background-color: white;
        width: fit-content;
        display: flex;
        flex-direction: column;
        padding: 10px 13px;
        box-sizing: border-box;
    }

    .question-label {
        color: var(--ink);
        text-transform: uppercase;
        font-weight: 700;
        font-size: 14px;
    }

    .question-text {
        color: var(--pine);
        font-weight: 400;
        font-size: 20px;
    }
</style>