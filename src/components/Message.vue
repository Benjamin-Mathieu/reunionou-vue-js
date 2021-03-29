<template>
    <article class="message is-link">
        <div class="message-header">
            <p>{{message.user_id}}</p>
        </div>
        <div class="message-body">
            <p>{{message.text}}</p>
            <p style="text-align: right; font-size: 0.8em">{{dateMsg}}</p>
        </div>
    </article>
</template>

<script>
export default {
    props: ['message'],
    data() {
        return {
            dateMsg : ''
        }
    },
    mounted() {
        let d = new Date(this.message.created_at);
        let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        this.dateMsg = d.toLocaleDateString('fr-FR', options);

        console.log(this.$store.state.messages);
    }
}
</script>

<style lang="scss" scoped>
    .message{
        width: 50%; margin: auto;
    }
</style>