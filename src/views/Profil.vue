<template>
    <div class="profil">
        <form class="form-profil" v-on:submit.prevent="profil">
            
            <h1>Votre profil</h1>
    
            <p>Bastien</p>
            <p>test@gmail.fr</p>
            <p><router-link to="NewMdp">Changer de mot de passe</router-link></p>
            <p><button class="button is-danger">Supprimer compte</button></p>
            
        </form>
    </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
    data(){
        return{
            profil : null
        }
    },    
}
</script>

<style lang="scss" scoped>
    .profil {
        //height: 100vh;
        text-align: center;
    
        .form-profil {
            padding: 1em;
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
        }
    }
</style>

