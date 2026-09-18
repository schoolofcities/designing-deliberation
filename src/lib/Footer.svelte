<script>
	import logos from '../assets/sofc-uoft-logo-white-colour.svg';

    let {
        page
    } = $props();

    let currYear = new Date().getFullYear();

</script>

<footer class="bottom">
    <a href="https://schoolofcities.utoronto.ca/" target="_blank" class="logo-link">
        <img src={logos} alt="University of Toronto and School of Cities logos" class="logos"/>
    </a>
    <p>© 2026 {currYear === 2026 ? "" : "– " + currYear.toString()} Daniel Fusca</p>
    <p>Web design & development by <a href="https://linkedin.com/in/miekoyao">Mieko Yao</a></p>
</footer>

<style>
    footer {
        background: var(--pine);
        color: #fff;
        padding: 14px 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        box-sizing: border-box;
    }

    a {
        color: white;
    }

    @media (max-width: 900px) {
        footer {
            flex-direction: column;
            gap: 5px;
        }
    }
</style>