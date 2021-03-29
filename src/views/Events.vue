<template>
    <div>
        <h3 class="title is-3">Évènements publics</h3>
        <section class="public-events card">
            <div class="card-content columns is-mobile is-multiline is-centered">
                <div v-for="event in $store.state.events">
                <Event :event="event"/>
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
    },
    methods: {
      getEvents() {
        api.get("/events").then(response => {
                this.$store.commit("setEvents", response.data.events);
            }).catch(error => {
                alert(error.response.data.message)
            })
      }
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
        margin: 2em;
    }
</style>