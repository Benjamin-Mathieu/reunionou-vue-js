<template>
    <div class="event">
            <ul>
                <li>Titre: {{event.event.title}} </li>
                <li>Adresse: {{event.event.adress}} </li>
                <li>Createur: {{event.event.creator.firstname}} </li>
                <li>Date: {{event.event.date}} </li>
                <li><router-link :to="{name: 'Event', params:{id : event.event.id}, query: { token: event.event.token }}">Voir détails</router-link></li>
            </ul>
    </div>
</template>

<script>
export default {
    props: ['event'],
    mounted() {
        console.log(this.event);
    }
    
}
</script>
<style lang="scss" scoped>
    .event {
        ul {
            margin-top: 2em;
            padding: 1em;
            background-color: whitesmoke;
            border-radius: 10px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
    }
</style>