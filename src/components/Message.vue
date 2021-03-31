<template>
    <article class="message is-link">

        <!-- Entête du message avec les boutons pour éditer et supprimer -->
        <div v-bind:class="{ myMsg: myMsg }" class="message-header">
            <p>{{message.user.firstname}}</p>
            <div class="level-item" v-bind:class="{ hide: hideButtons }">
                <button class="button is-small level-item is-link" @click="showEdit">
                    <span>Editer</span>
                    <span class="icon is-small">
                            <img src="../assets/edit-white.svg" alt="edit-icon">
                    </span>
                </button>
                <button @click="deleteMessage" class="delete" aria-label="delete"></button>
            </div>
        </div>

        <!-- Corps du message -->
        <div class="message-body">
            <p>{{message.message.text}}</p>

            <!-- Formulaire pour éditer le message -->
            <form v-bind:class="{ hide: hide }" @submit.prevent="editMessage" class="form-edit" ref="formEdit">
                <input class="input is-small" v-model="editMsg" :placeholder="message.message.text" required type="text">
                <button class="button is-info is-small" ref="editMsgButton">
                     <span class="icon is-small">
                            <img src="../assets/done-white-24dp.svg" alt="valid-icon">
                    </span>
                </button>
            </form>
            
            <!-- Affichage des dates d'envoi et de modification -->
            <p class="help" style="text-align: right">{{dateMsg}}</p>
            <p v-if="dateMsg != dateEditMsg" class="help" style="text-align: right">modifié le: ({{dateEditMsg}})</p>
        </div>
    </article>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
    props: ['message'],
    data() {
        return {
            dateMsg: '',
            dateEditMsg: '',
            editMsg: '',
            hide: true,
            hideButtons: true,
            myMsg: false
        }
    },
    mounted() {
        // Formatage de la date pour l'affichage
        let d = new Date(this.message.message.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        this.dateMsg = d.toLocaleDateString('fr-FR', options);

        let upd = new Date(this.message.message.updated_at);
        this.dateEditMsg = upd.toLocaleDateString('fr-FR', options);

        // Le bouton pour supprimer un message s'affiche seulement si user_id du message correspond bien à l'id de l'utilisateur connecté 
        let decoded = jwt_decode(this.$store.state.jwtToken);

        if(this.message.message.user_id == decoded.user.id ) {
            this.hideButtons = false;
            this.myMsg = true;
            console.log(this.myMsg)
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
                    this.$bus.$emit("getEventMessage");
                }).catch(error => {
                    console.log(error.res.data.error)
                });
            }
        },
        showEdit() {
            this.$refs.formEdit.classList.toggle("hide");
        },
        editMessage() {
            this.$refs.editMsgButton.classList.add("is-loading");
            api.put("/events/" + this.$route.params.id + "/messages/" + this.message.message.id,
                {
                    "text" : this.editMsg
                },
                {
                    headers: {
                            "Authorization": "Bearer " + this.$store.state.jwtToken
                        }
                }).then(res => {
                    this.$refs.editMsgButton.classList.remove("is-loading");
                    this.$refs.formEdit.classList.add("hide");
                    this.$bus.$emit("getEventMessage");
                }).catch(error => {
                    console.log(error.res.data.error)
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    .message{
        width: 80%; margin: auto;

        .message-body {
            p {
                color:#4a4a4a;
            }
        }
        .message-header {
            background-color: #4a4a4a;
        }

        .myMsg {
            background-color: #3273dc;
        }

        .form-edit {
            position: relative;
            button {
                position: absolute; top: 0; right: 0;
            }
        }
    }
    
</style>