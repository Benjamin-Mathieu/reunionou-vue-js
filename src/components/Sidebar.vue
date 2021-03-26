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
            <button v-if="this.$store.state.jwtToken === false" class="button is-success" >
            <router-link to="/" >
                <span>Connexion</span>
            </router-link>
            </button>
            <button v-else @click="disconnectUser" :class="{ hide: hide }" class="button " id="disconnectButton">
                <span>Se déconnecter</span>
            </button>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return{
            hide: true
        }
    },
    mounted() {
        if(this.$store.state.jwtToken) {
            this.hide = false;
        }
    },
    methods: {
        disconnectUser() {
            if(confirm("Se déconnecter ?")) {
                this.$store.state.jwtToken = false;
                this.$store.commit("setToken", this.$store.state.jwtToken);
                this.$router.push("/");
            } 
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar {
        text-decoration: none;
        width: 264px;
        background-color: #444257;
        text-align: center;

        .navbar{
            height: 100%;
            width: auto;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            display: block;
            background-color: #444257;
            overflow-x: hidden;
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
            display: block;

        }
    }
</style>