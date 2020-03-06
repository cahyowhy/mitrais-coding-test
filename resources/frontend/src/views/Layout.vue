<!--suppress ALL -->
<template>
    <div class="layout-page">
        <nav class="navbar is-transparent">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img alt="Bulma: a modern CSS framework based on Flexbox" src="/img/logo.jpg">
                    </a>
                </div>

                <div class="navbar-menu">
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <common-field is-grouped>
                                <div class="control">
                                    <router-link class="button is-dark" to="/">
                                        Login
                                    </router-link>
                                </div>
                                <div class="control">
                                    <router-link class="button is-link" to="/register">
                                        Register
                                    </router-link>
                                </div>
                            </common-field>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container main-content">
            <router-view></router-view>
        </div>
        <footer class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="/img/logo.jpg">
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
    @import "../style/variables_function";

    .layout-page {
        nav.navbar {
            margin-bottom: 16px;
            @include b_sh_def(true);

            img {
                height: 34px;
                max-height: none;
            }
        }

        .container.main-content {
            min-height: calc(100vh - 120px);
        }

        footer.navbar {
            background-color: $color-purple;
        }
    }
</style>
