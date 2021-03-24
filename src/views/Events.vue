<template>
    <div>
        <section class="public-events">
            <h1>Evènements publics</h1>
            <div v-for="event in $store.state.events">
                <Event :event="event"/>
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
    }
}
</script>