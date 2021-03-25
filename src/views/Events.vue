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

<style lang="scss" scoped>
    .events {
        display: flex; flex-direction: column; justify-content: center;

        .form-evenement {
            padding: 1em;
            background: #ffffff;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            
            .event {
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                background: #b9b9b9;

                .label {
                    color: white;
                    
                }
            }
        }
        .form-invitation {
            margin-top: 5em;
            padding: 1em;
            background: #ffffff;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            
            .event {
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 10px;
                background: #b9b9b9;

                .label {
                    color: white;
                }

                .button{
                    float: left;
                }
            }
        }
        .button{
            display: block;
            margin : auto;
        }
    }
</style>