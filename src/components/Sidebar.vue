<template>
    <div class="sidebar">
        <nav class="navbar" role="navigation" aria-label="dropdown navigation">
            <a class="navbar-item">
                <h1>Reunionou</h1>
            </a>
            <a class="navbar-item">
                <router-link to="/profil">Profil</router-link>
            </a>
            <a class="navbar-item">
                <router-link to="/events">Evènements</router-link>
            </a>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .sidebar {
        height: 100vh;
        width: 264px;
        background-color: #444257;
        text-align: center;
        h1 {
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }
        .navbar-item {
            background-color: transparent;
        }
    }
</style>