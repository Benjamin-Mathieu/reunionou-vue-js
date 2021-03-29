<template>
    <div class="event column">
            <ul>
                <li><b>Titre:</b> {{event.event.title}} </li>
                <li><b>Adresse:</b> {{event.event.adress}} </li>
                <li><b>Createur:</b> {{event.event.creator.firstname}} </li>
                <li><b>Date:</b> {{dateEvent}} </li>
                <li><router-link :to="{name: 'Event', params:{id : event.event.id}, query: { token: event.event.token }}">Voir détails</router-link></li>
            </ul>
    </div>
</template>

<script>
export default {
    props: ['event'],
    data() {
        return {
            dateEvent: ''
        }
    },
    mounted() {
        console.log(this.event);
        let d = new Date(this.event.event.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        this.dateEvent = d.toLocaleDateString('fr-FR', options);
    }
    
}
</script>
<style lang="scss" scoped>
    .event {
        ul {
            margin: 1em;
            padding: 1em;
            background-color: #CCC;
            border-radius: 10px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
    }
</style>