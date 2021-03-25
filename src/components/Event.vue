<template>
    <div class="event">
            <ul>
                <li>Titre: {{event.event.title}} </li>
                <li>Adresse: {{event.event.adress}} </li>
                <li>Créateur: {{event.event.creator.firstname}} </li>
                <li>Date: {{event.event.date}} </li>
                <li>ID: {{event.event.id}} </li>
            </ul>
        
    </div>
</template>

<script>
export default {
    props: ['event'],
    mounted() {
        console.log(this.event.event);
    }
    
}
</script>

<style lang="scss" scoped>
    .event {
        ul {
            margin: auto;
            background-color: whitesmoke;
            border: 1px solid black;
        }
    }
</style>