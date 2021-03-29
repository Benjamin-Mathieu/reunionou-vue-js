<template>
    <section class="detail-event">
        <div id="map" v-bind:class="{ hide: hideMap }"></div>
        <div class="info-event">
            Titre: {{title}}
            Description: {{description}}
            Adresse: {{adress}}
            Créateur: {{creator}}
            Date: {{date}}
            Participants: {{participants}}
        </div>
            
        <div class="buttons">
            <button @click="participateEvent" class="button is-success" v-bind:class="{ hide: hideParticipateButtons }" ref="participate">
                <span>Je participe</span>
            </button>
            <button class="button is-danger" :class="{ hide: hideParticipateButtons }" ref="notparticipate">
                <span>Je ne participe pas</span>
            </button>
            <button @click="deleteEvent" class="button is-danger" v-bind:class="{ hide: hideDeleteButton }">
                <span>Supprimer l'event</span>
            </button>
        </div>
        <div v-for="message in $store.state.messages">
                <Message :message="message"/>
        </div>
        <form @submit.prevent="sendMessage">
            <input class="input" v-model="message" required type="text" placeholder="Tapez votre message">
            <button class="button is-info">Envoyer</button>
        </form>
    </section>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from '../assets/logo.png';
import jwt_decode from "jwt-decode";
import Message from '@/components/Message.vue';

export default {
    components: {
        Message
    },
    data() {
        return {
            title: '',
            description: '',
            adress: '',
            creator: '',
            date: '',
            participants: '',
            hideParticipateButtons: false,
            hideDeleteButton: true,
            hideMap: false,
            message: ''
        }
    },
    mounted() {
        this.getEvent();
        this.$bus.$on('getEvent', this.getEvent);
        this.getEventMessage();
        this.$bus.$on('getEventMessage', this.getEventMessage);

        console.log(this.$store.state.messages);
    },
    methods: {
        getEventMessage() {
            api.get("/events/" + this.$route.params.id + "/messages", {
             headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(res => {
                this.$store.commit("setMessages", res.data.messages);
            }).catch(error => {
                alert(error.res.data.message)
            });
        },
        sendMessage() {
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
                alert('Message envoyé');
            }).catch(error => {
                alert(error.res.data.message)
            });
        },
        getEvent() {
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

                let jwt_token = this.$store.state.jwtToken;
                        let decoded = jwt_decode(jwt_token);
                        console.log(decoded.user);

                
                // Check si c'est le créateur de l'évènement et enlève les boutons de l'affichage
                if(response.data.event.user_id == decoded.user.id) {
                    this.hideParticipateButtons = true
                    this.hideDeleteButton = false
                }

                response.data.event.participants.forEach(participant => {
                    this.participants += " " + participant.firstname
                });

                if(this.participants === "") {
                    this.participants = "Aucun participant pour le moment"
                } 

                // Affichage de la carte
                api_adress.get("/search/?q=" + this.adress.replaceAll(" ", "+")).then(res => {
                    console.log(res.data)
                    if(res.data.features.length > 1 || res.data.features.length == 0) {
                        alert("L'adresse saisi est incorrect, veuillez la modifier pour l'afficher correctement sur la map");
                        this.hideMap = true;
                    }
                    else {
                        let latitude = res.data.features[0].geometry.coordinates[1];
                        let longitude = res.data.features[0].geometry.coordinates[0];
                        console.log(latitude, longitude);
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

                        let marker = L.marker([latitude, longitude]).addTo(map);
                        // marker.bindPopup("<b>Lieu de l'évènement</b>").openPopup();
                        map.addLayer(openStreetMapLayer);
                    }
                })

            }).catch(error => {
                alert(error.response.data.message)
            })
        },



        participateEvent() {
            let jwt_token = this.$store.state.jwtToken;
            let decoded = jwt_decode(jwt_token);
            console.log(decoded.user);

            api.post("/events/" + this.$route.params.id + "/participants", 
            {
                "mail": decoded.user.mail
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.$store.state.jwtToken
                }
            }).then(response => {
                alert('User added');
                this.disabled = true;
            }).catch(error => {
                alert(error.response.data.message);
            });
        },

        deleteEvent() {
            if(confirm("Voulez-vous supprimer l'évènement ?")) {
                api.delete("/events/" + this.$route.params.id, 
                {
                    headers: {
                        "Authorization": "Bearer " + this.$store.state.jwtToken
                    }
                }).then(response => {
                    alert('Event deleted');
                    this.$router.push("/events");
                }).catch(error => {
                    alert(error.response.data.message);
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
            margin: auto;
        }
        .hide {
            display: none
        }
    }
    
</style>