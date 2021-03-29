<template>
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">{{firstname}} {{name}}</p>
                        <p class="subtitle is-6"><a :href="'mailto:'+mail">{{mail}}</a></p>
                    </div>
                </div>
                <button class="button">Modifier le mot de passe</button>
                <button class="button">Supprimer le profil</button>
            </div>
        </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
    data() {
        return{
            firstname: '',
            name: '',
            mail: ''
        }
    },
    mounted() {
        if(!this.$store.state.jwtToken) {
            alert('Vous devez être connecté pour voir votre profil !');
            this.$router.push("/");
        };
        
        let jwt_token = this.$store.state.jwtToken;
        let decoded = jwt_decode(jwt_token);
        console.log(decoded.user);

        this.firstname = decoded.user.firstname;
        this.name = decoded.user.name;
        this.mail = decoded.user.mail;
    }
}
</script>


<style lang="scss" scoped>
    .card {
        margin: auto; width:50%;
    }
</style>
