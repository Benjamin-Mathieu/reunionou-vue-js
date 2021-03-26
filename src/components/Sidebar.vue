<template>
    <div class="sidebar">
        <nav class="navbar" role="navigation" aria-label="dropdown navigation">
            <a class="navbar-item">
                <router-link to="/"><h1>Reunionou</h1></router-link>
            </a>
            <a class="navbar-item">
                <router-link to="/profil">Profil</router-link>
            </a>
            <a class="navbar-item">
                <router-link to="/events">Evènements</router-link>
            </a>
            <a class="navbar-item">
                <router-link to="/">Déconnexion</router-link>
            </a>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .sidebar {
        text-decoration: none;
        width: 264px;
        background-color: #444257;
        text-align: center;

        .navbar{
            height: 100vh;
            position: fixed;
            display: block;
            background-color: #444257;

        }
        h1 {
            color: white;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-size: 50px;
        }
        a{
            color: white;
            font-size: 20px;

            
        } 
        .navbar-item {
            text-decoration: none;
            color: white;
            background-color: transparent;

        }
    }
</style>