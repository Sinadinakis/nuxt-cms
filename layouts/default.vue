<template>
    <div class='container'>

        <Header />

        <nuxt class="container" />

        <Footer />
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';

    export default {
        components: {
            Header,
            Footer
        },
        mounted() {
            if (process.client) {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {
                    $navbarBurgers.forEach(el => {
                        el.addEventListener('click', () => {
                            const target = el.dataset.target;
                            const $target = document.getElementById(target);
                            el.classList.toggle('is-active');
                            $target.classList.toggle('is-active');
                        });
                    });
                }
            }
        }
    };
</script>
