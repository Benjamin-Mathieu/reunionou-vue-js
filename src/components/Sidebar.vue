<template>
    <div class="sidebar">
        <nav class="navbar" role="navigation" aria-label="dropdown navigation">
            <a>
                <router-link to="/"><h1>Reunionou</h1></router-link>
            </a>
             <div class="navbar-brand">
                <img src="../assets/account_circle-white-24dp.svg" alt="icons" style="width:40px; height: 40px">
                <a class="navbar-item">
                <router-link to="/profil">Profil</router-link>
                </a>
            </div>
            <div class="navbar-brand">
                <img src="../assets/celebration-white-24dp.svg" alt="icons" style="width:40px; height: 40px">
                <a class="navbar-item">
                <router-link to="/events">Evènements</router-link>
                </a>
            </div>
            
            <button v-if="this.$store.state.jwtToken === false" class="button is-success" >
            <router-link to="/" >
                <span>Connexion</span>
            </router-link>
            </button>
            <button v-else @click="disconnectUser" :class="{ hide: hide }" class="button" id="disconnectButton">
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
        background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(76,45,253,1) 100%);
        text-align: center;

        .navbar{
            height: 100%;
            position: fixed;
            display: block;
            background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(76,45,253,1) 100%);
            overflow-x: hidden;
        }
        h1 {
            color: white;
            font-family: 'Roboto';
            font-size: 50px;
        }
        a{
            color: white;
            font-size: 20px;
        }
        .navbar-brand:hover {
            background-color: rgba(34,193,195,0.8);
        }
    }
</style>