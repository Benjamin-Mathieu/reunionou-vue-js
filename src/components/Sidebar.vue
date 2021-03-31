<template>
    <div class="sidebar">
        <nav class="navbar" role="navigation" aria-label="dropdown navigation">
            <img src="../assets/logo.png" alt="logo-app" class="logo">

            <!-- Liens qui redirige sur le profil et les évènements -->
            <div class="links">
                <router-link to="/profil">
                    <div class="navbar-brand">
                        <img src="../assets/account_circle-white-24dp.svg" alt="icons" style="width:40px; height: 40px">
                        <a class="navbar-item">
                            <span>Profil</span>
                        </a>
                    </div>
                </router-link>
                
                <router-link to="/events">
                    <div class="navbar-brand">
                        <img src="../assets/celebration-white-24dp.svg" alt="icons" style="width:40px; height: 40px">
                        <a class="navbar-item">
                            <span>Evènements</span>
                        </a>
                    </div>
                </router-link> 
            </div>
             
             <!-- Affichage des boutons de connexion et déconnexion selon l'état du JWT dans le store -->
            <div class="auth">
                <button v-if="this.$store.state.jwtToken === false" class="button is-success" >
                <router-link to="/" >
                    <span>Connexion</span>
                </router-link>
                </button>
                <button v-else @click="disconnectUser" :class="{ hide: hide }" class="button is-danger" id="disconnectButton">
                    <span>Se déconnecter</span>
                </button>
            </div>
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
            display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 1em;
            position: fixed;
            background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(76,45,253,1) 100%);
            overflow-x: hidden;

            .logo {
                width: 140px; height: 160px;
            }
            .links{ 
                margin-top: -15em;
            }
            .auth {
                padding: 1em;
            }
            h2 {
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
                width: calc(100% + 1em);
            }
        }
    }
</style>