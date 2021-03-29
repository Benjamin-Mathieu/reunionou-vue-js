<template>
    <div>
        <h3 class="title is-3">Publiques</h3>
        <section class="public-events card">
            <div class="card-content columns is-mobile is-multiline is-centered">
                <div v-for="event in $store.state.events" :key="event.id">
                    <Event v-if="event.event.public == 1" :event="event"/>  
                </div>
            </div>
        </section>

        <h3 class="title is-3">Privés</h3>
        <section class="public-events card">
            <div class="card-content columns is-mobile is-multiline is-centered">
                <div v-for="event in $store.state.privateEvents" :key="event.id">
                    <Event v-if="event.event.public == 0" :event="event"/>  
                </div>
            </div>
        </section>

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
        this.getEvents();
        this.$bus.$on('getEvents', this.getEvents);

        this.getPrivateEvents();
        this.$bus.$on('getPrivateEvents', this.getPrivateEvents);

        console.log(this.$store.state.privateEvents);
    },
    methods: {
      getEvents() {
        api.get("/events").then(response => {
                this.$store.commit("setEvents", response.data.events);
            }).catch(error => {
                alert(error.response.data.message)
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
                alert(error.response.data.message)
            })
      },
    }
}
</script>

<style lang="scss" scoped>
    .public-events{
        background-color: white;
        padding: 1em;
        margin: 2em;
    }
</style>