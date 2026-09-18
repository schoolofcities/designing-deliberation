<script>
    let {
        height = 17,
        fill = "black",
        back = false
    } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={height * (25/17)} height={height} viewBox="0 0 25 17" aria-hidden="false" class:back={back}>
    <path d="m.037 9.418 21.088-.01-5.985 5.587 1.329 1.434 8.567-8.002L16.469.429l-1.33 1.434 5.993 5.59-21.096.009z" fill="currentColor" fill-rule="nonzero"></path>
</svg>

<style>
    .back {
        transform: rotate(180deg);
    }
</style>