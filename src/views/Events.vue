<template>
    <div>
        <!-- Affichage des évènements publiques -->
        <section class="public-events card">
            <h3 class="title is-3">Publiques</h3>
            <div class="card-content columns is-mobile is-multiline is-centered">
                <div v-for="event in $store.state.events" :key="event.id">
                    <Event :event="event"/>  
                </div>
            </div>
        </section>

        <!-- Affichage des évènements crée en privé ou en attente -->
        <div v-if="this.$store.state.jwtToken == false"></div>
        <div v-else>
            <section class="public-events card">
                <h3 class="title is-3">Privés</h3>
                <div v-if="$store.state.privateEvents.length == 0"><p>Aucun évènement privé à afficher</p></div>
                <div v-else class="card-content columns is-mobile is-multiline is-centered">
                    <div v-for="event in $store.state.privateEvents" :key="event.id">
                        <Event :event="event"/>  
                    </div>
                </div>
            </section>
        </div>

        <!-- Affichage du modal pour crée un event -->
        <CreateEvent/>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Event from '@/components/Event.vue';
import CreateEvent from '@/components/CreateEvent.vue';
export default {
    components: {
        Sidebar,
        Event,
        CreateEvent
    },
    mounted() {
        // Récupération des évènements publiques et privés
        this.getEvents();
        this.$bus.$on('getEvents', this.getEvents);

        if(this.$store.state.jwtToken) {
            this.getPrivateEvents();
            this.$bus.$on('getPrivateEvents', this.getPrivateEvents);
        }
    },
    methods: {
        
    //Appel à l'API pour stocker les données des évènements publiques et privés dans le store
      getEvents() {
        api.get("/events").then(response => {
                this.$store.commit("setEvents", response.data.events);
            }).catch(error => {
                console.error(error.response.data.message)
            })
      },
      getPrivateEvents() {
        api.get("/privateEvents", {
            headers: {
                Authorization: "Bearer" + this.$store.state.jwtToken
            }
        })
        .then(response => {
                this.$store.commit("setPrivateEvents", response.data.events);
            }).catch(error => {
               console.error(error.response.data.message);
            })
      },
    }
}
</script>

<style lang="scss" scoped>
    h3{
        margin-top: 1em;
    }
    .public-events{
        background-color: white;
        padding: 1em;
        margin: 0 2em 2em 2em;
    }
</style>