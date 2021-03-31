<template>
    <section class="detail-event">
        <div id="map" v-bind:class="{ hide: hideMap }"></div>
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>{{title}}</strong> <small>par <b>{{creator}}</b> le {{date}}</small> 
                            <br>
                            <small>Adresse: {{adress}}</small>
                            <br><br>
                            Description: {{description}}
                            <br>
                            Participe: {{participants}}
                            <br>
                            Ne participe pas: {{notparticipate}}
                            <br>
                            En attente de réponse: {{pending}}
                        </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            <button @click="participateEvent(true)" class="button is-small is-success level-item" v-bind:class="{ hide: hideParticipateButtons }" ref="participate">
                                <span>Je participe</span>
                                <span class="icon is-small">
                                     <img src="../assets/done-white-24dp.svg" alt="valid-icon">
                                </span>
                            </button>
                             <button @click="participateEvent(false)" class="button is-small is-danger" :class="{ hide: hideParticipateButtons }" ref="notparticipate">
                                <span>Je ne participe pas</span>
                                <span class="icon is-small">
                                     <img src="../assets/not_interested-white-24dp.svg" alt="delete-icon">
                                </span>
                            </button>
                            <UpdateEvent  v-bind:class="{ hide: hideCreatorButtons }" />
                            <button @click="deleteEvent" class="button is-small is-danger is-outlined" v-bind:class="{ hide: hideCreatorButtons }" ref="deleteEventButton">
                                <span>Supprimer</span>
                                <span class="icon is-small">
                                     <img src="../assets/clear-black-24dp.svg" alt="delete-icon">
                                </span>
                            </button>
                        </div>
                    </nav>
                </div>
            </article>
        </div>
        
        <!-- Affichage des messages -->
        <section class="messages">
            <div v-if="$store.state.messages.length == 0">
                <article class="message is-danger">
                    <div class="message-body">
                        <p>Aucun message de poster pour le moment...</p>
                    </div>
                </article>
            </div>
            <div v-else v-for="message in $store.state.messages" :key="message.id">
                <Message :message="message"/>
            </div>

            <form class="form-msg" @submit.prevent="sendMessage">
                <input class="input" v-model="message" required type="text" placeholder="Tapez votre message">
                <button class="button is-info" ref="sendButton">Envoyer</button>
            </form>
        </section>
    </section>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from '../assets/logo.png';
import jwt_decode from "jwt-decode";
import Message from '@/components/Message.vue';
import UpdateEvent from '@/components/UpdateEvent.vue';

export default {
    components: {
        Message,
        UpdateEvent
    },
    data() {
        return {
            title: '',
            description: '',
            adress: '',
            creator: '',
            date: '',
            participants: [],
            notparticipate: [],
            pending: [],
            hideParticipateButtons: false,
            hideCreatorButtons: true,
            hideMap: false,
            message: ''
        }
    },
    mounted() {
        // Récupération des informations de l'évènement et des messages

        this.getEvent();
        this.$bus.$on('getEvent', this.getEvent);
        this.getEventMessage();
        this.$bus.$on('getEventMessage', this.getEventMessage);
        
        console.log(this.$store.state.messages);
    },
    beforeDestroy() {
        this.$store.state.messages = [];
    },
    methods: {
        getEventMessage() {
            this.$store.state.loading = true;
            api.get("/events/" + this.$route.params.id + "/messages", {
             headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(res => {
                this.$store.commit("setMessages", res.data.messages);
            }).catch(error => {
                console.log(error.res.data.message)
            }).finally(() => {
                this.$store.state.loading = false;
            });
        },
        sendMessage() {
            this.$refs.sendButton.classList.add("is-loading");

            api.post("/events/" + this.$route.params.id + "/messages", {
                "text" : this.message
            }, 
            {
                headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(res => {
                this.getEventMessage();
                this.message = "";
                this.$refs.sendButton.classList.remove("is-loading");
            }).catch(error => {
                console.log(error.res.data.message)
            });
        },
        getEvent() {
            // Récupération et déchiffrage du JWT pour récupérer les informations de l'utilisateur connecté sur l'application
            let jwt_token = this.$store.state.jwtToken;
            let decoded = jwt_decode(jwt_token);
            console.log(decoded.user);

            api.get("/events/" + this.$route.params.id + "?token=" + this.$route.query.token, {
                headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(response => {
                console.log(response.data.event)
                this.title = response.data.event.title
                this.description = response.data.event.description
                this.adress = response.data.event.adress
                this.creator = response.data.event.creator.firstname
                this.date = response.data.event.date
                
                // Check si c'est le créateur de l'évènement et enlève les boutons de participation de l'affichage et affiche le bouton pour supprimé l'event
                if(response.data.event.user_id == decoded.user.id) {
                    this.hideParticipateButtons = true
                    this.hideCreatorButtons = false
                }

                // Parcours les participants de l'évènement pour l'affichage des participants, non participants, en attente
                response.data.event.participants.forEach(participant => {

                    // stockage du prénom + nom du participant
                    let theParticipant = participant.firstname + " " + participant.name;

                    if(participant.pivot.present == true) {
                        this.participants.push(theParticipant); // push chaque participant dans l'array des participants

                        // Vérification si l'array participants contient des prénoms déjà présent dans l'array pending, si oui le retire de l'array des personnes en attente de réponse
                        this.participants.forEach(participant => {
                            if(this.pending.includes(participant)) {
                                const index = this.pending.indexOf(participant);
                                if(index > -1) {
                                    this.pending.splice(index, 1);
                                }
                            }
                        });
                    }
                    if(participant.pivot.present == false) {
                        this.notparticipate.push(theParticipant); // push chaque non participant dans l'array des notparticipate

                        // Vérification si l'array notparticipate contient des prénoms déjà présent dans l'array pending, si oui le retire de l'array des personnes en attente de réponse
                        this.notparticipate.forEach(participant => {
                            if(this.pending.includes(participant)) {
                                const index = this.pending.indexOf(participant);
                                if(index > -1) {
                                    this.pending.splice(index, 1);
                                }
                            }
                            if(this.participants.includes(participant)) {
                                const index = this.participants.indexOf(participant);
                                if(index > -1) {
                                    this.participants.splice(index, 1);
                                }
                            }
                        });
                    } 
                    if(participant.pivot.present == null) {
                        this.pending.push(theParticipant);
                        console.log(this.pending);
                    }
                });

                // Transformation des arrays pour l'affichage
                this.participants = this.participants.toString();
                this.notparticipate = this.notparticipate.toString();
                this.pending = this.pending.toString();

                // Appel de l'api data-gouv pour récupérer les coordonnées GPS à l'aide de l'adresse de l'évènement
                api_adress.get("/search/?q=" + this.adress.replaceAll(" ", "+")).then(res => {
                    // Création de la map avec Leaflet
                    let latitude = res.data.features[0].geometry.coordinates[1];
                    let longitude = res.data.features[0].geometry.coordinates[0];
                    let map = L.map("map").setView([latitude, longitude], 15);
                
                    let openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors',
                        maxZoom: 100,
                        tileSize: 512,
                        zoomOffset: -1
                        });

                    let DefaultIcon = L.icon({
                        iconUrl: icon,
                        iconSize:     [50, 95], // size of the icon
                        iconAnchor: [25,95]
                    });
                    L.Marker.prototype.options.icon = DefaultIcon;

                    L.marker([latitude, longitude]).addTo(map);
                    map.addLayer(openStreetMapLayer);
                })
            }).catch(error => {
                console.error(error.response.data.message)
            });
        },

        participateEvent(response) {
            if(response == true) {
                this.$refs.participate.classList.add("is-loading");
            }
            if(response == false){
                this.$refs.notparticipate.classList.add("is-loading");
            }

            // Appel de l'API pour donné sa réponse à l'invitation d'un évènement, si response est à: true = participe, null = en attente, false = ne participe pas
            api.put("/events/" + this.$route.params.id + "/response", 
            {
                "response": response
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(response => {
                this.$refs.participate.classList.remove("is-loading");
                this.$refs.notparticipate.classList.remove("is-loading");
                console.log(response);
            }).catch(error => {
                console.error(error.response.data.message);
            });
        },

        deleteEvent() {
            this.$refs.deleteEventButton.classList.add("is-loading");
            // Appel de l'API pour supprimer un évènement après confirmation
            if(confirm("Voulez-vous supprimer l'évènement ?")) {
                api.delete("/events/" + this.$route.params.id, 
                {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.jwtToken
                    }
                }).then(response => {
                    this.$router.push("/events");
                    this.$bus.$emit("getEvent");
                }).catch(error => {
                    console.error(error.response.data.message);
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .detail-event {
        
        #map {
            height: 400px; width: 80%;
            margin: 1em auto 2em;
        }
        .box {
            width: 80%;
            margin: auto;
            position: relative;
        }
        .messages {
            margin: 4em 0;

            .form-msg {
                width: 80%; margin: auto;
                position: relative;

                button {
                    position: absolute; top: 0; right: 0;
                }
            }
        }
        nav{
            position: absolute; top: 0; right: 0;
        }
        .info-event{
            text-align: center;
            margin-top: 1em;
        }
        .buttons{
            display: block;
            text-align: center;
            margin-top: 1em;
        }
    }
    
</style>