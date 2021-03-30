<template>
    <div class="event column">
            <ul :class="{myEvents: myEvents}">

                <!-- Affichage du bouton pour pour permettre au créateur d'un évènement d'inviter d'autres utilisateurs via leur mail  -->
                <div v-if="event.event.creator.id == user_id">
                    <img @click="showForm" class="invite-img" src="../assets/add-user.svg" alt="invite-icon">
    
                    <!-- Si le bouton Inviter est cliqué alors le formulaire pour rentré le mail s'affiche -->
                    <div v-if="show" id="invite-event">
                        <section>
                            <h3>Invitations</h3>
                            <form @submit.prevent="inviteEvent">
                                    <div><input v-model="mail" required type="mail" placeholder="Rentrer l'adresse mail de la personne à inviter..."></div>
                                    <button class="button is-link">Inviter</button>
                                    <button type="button" @click="maskForm" class="button is-warning button-clear">Annuler</button>
                            </form>
                        </section>
                    </div>
                </div>
                
                <!-- Affichage des informations de l'évènement et redirection pour voir l'évènement en détail -->
                <li><b>Titre:</b> {{event.event.title}} </li>
                <li><b>Adresse:</b> {{event.event.adress}} </li>
                <li><b>Createur:</b> {{event.event.creator.firstname}} </li>
                <li><b>Date:</b> {{dateEvent}} </li>
                <li><router-link :to="{name: 'Event', params:{id : event.event.id}, query: { token: event.event.token }}">Voir détails</router-link></li>
            </ul>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
    props: ['event'],
    data() {
        return {
            dateEvent: '',
            user_id : '',
            show: false,
            close: false,
            mail: '',
            myEvents: false
        }
    },
    mounted() {
        console.log(this.event);
        // Formatage de la date pour l'affichage de la date de création de l'évènement
        let d = new Date(this.event.event.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        this.dateEvent = d.toLocaleDateString('fr-FR', options);

        let jwt_token = this.$store.state.jwtToken;
        let decoded = jwt_decode(jwt_token);
        this.user_id = decoded.user.id;

        // Permet de savoir quels évènements ont été crée par l'utilisateur
        if(this.event.event.creator.id == this.user_id) {
            this.myEvents = true;
        }
    },
    methods: {
        showForm() {
            this.show = true;
        },
        maskForm() {
            this.show = false;
        },
        inviteEvent() {
            let jwt_token = this.$store.state.jwtToken;
            console.log(this.event.event.id);

            // Appel de l'API pour inviter un utilisateur à son évènement
            api.post("/events/" + this.event.event.id + "/participants", {
                mail: this.mail
            }, {
                headers: {
                    "Authorization": "Bearer " + jwt_token
                }
            }).then(response => {
                console.log(response);
                alert("L'utilisateur " + this.mail + "a été invité à votre évènement " + this.event.event.title);
                this.show = false;
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
    }
}
</script>
<style lang="scss" scoped>

    .myEvents {
        background-color: rgba(0, 0, 0, 0.6);
        color: whitesmoke;
    }
    
    .event {
        position: relative;
        ul {
            margin: 1em;
            padding: 1em;
            border-radius: 10px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }

        .invite-img {
            height: 40px; width: 40px;
            position: absolute; top: 0; right: 6px;
            opacity: 0.9;
        }
        .invite-img:hover {
            cursor: pointer;
            opacity: 1;
        }
    }

    #invite-event {
        position: fixed;
        z-index: 1000;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);

        section {
        position: absolute;
        left: 50%; 
        top: 50%;
        width: 50%;
        transform: translate(-50%, -50%);
        background: whitesmoke;
        padding: 1em;
        border-radius: 1em;

        h3 {
            color:#363636;
        }

        .close {
            position: absolute;
            top: -1em;
            right: -1em;
            width: 3em;
            height: 3em;
            line-height: 3em;
            margin: 0;
            padding: 0;
            border-radius: 50%;
        }
        .close:hover {
            cursor: pointer;
        }

        form {
        border: none;
        text-align: center;

        div {
            margin: .5em;

            input {
                padding: 0.3em;
                margin: 0.3em;
                border-top: none; border-left: none; border-right: none;
                border-bottom: 1px solid #2750B8;
                border-radius: .3em;
                width: 100%;
            }
        }
    }}
    }

    
</style>