<template>
    <article class="message is-link">
        <div class="message-header">
            <p>{{message.user.firstname}}</p>
            <button @click="deleteMessage" class="delete" aria-label="delete" v-bind:class="{ hide: hideDeleteButton }"></button>
        </div>
        <div class="message-body">
            <p>{{message.message.text}}</p>
            <p style="text-align: right; font-size: 0.8em">{{dateMsg}}</p>
        </div>
    </article>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
    props: ['message'],
    data() {
        return {
            dateMsg : '',
            hideDeleteButton: false
        }
    },
    mounted() {
        // Formatage de la date pour l'affichage
        let d = new Date(this.message.message.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        this.dateMsg = d.toLocaleDateString('fr-FR', options);

        let decoded = jwt_decode(this.$store.state.jwtToken);

        // Le bouton pour supprimer un message s'affiche seulement si user_id du message correspond bien à l'id de l'utilisateur connecté 
        if(this.message.message.user_id != decoded.user.id ) {
            this.hideDeleteButton = true;
        }
    },
    methods: {
        deleteMessage() {
            if(confirm("Supprimer le message ?")) {
                api.delete("/events/" + this.$route.params.id + "/messages/" + this.message.message.id,
                {
                    headers: {
                            "Authorization": "Bearer " + this.$store.state.jwtToken
                        }
                }).then(res => {
                    alert('Message supprimé');
                    this.$bus.$emit("getEventMessage");
                }).catch(error => {
                    alert(error.res.data.error)
                });
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .message{
        width: 80%; margin: auto;
    }
</style>