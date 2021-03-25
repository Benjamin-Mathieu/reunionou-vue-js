<template>
    <div class="events">
        <h1>Evenement(s)</h1>
        <!-- <Sidebar/> -->
        <form class="form-evenement" v-on:submit.prevent="event">
            <h2>A venir </h2>
            <div class="event">
                <div class="field">
                    <label class="label">Adresse : </label>
                </div>
                <div class="field">
                    <label class="label">Date et heure : </label>
                    <hr>
                </div>
                <div class="field">
                    <label class="label">Participant(s) : </label>
                </div>
            </div>
        </form>
        <form class="form-invitation" v-on:submit.prevent="invitation">
            <h2>Invitation(s)</h2>
            <div class="event">
                <div class="field">
                    <label class="label">Alex vous à invité</label>
                    <hr>
                </div>
                <div class="field">
                    <label class="label">Titre : </label>
                </div>
                <div class="field">
                    <label class="label">Lieu : </label>
                </div>
                <div class="field">
                    <label class="label">Date : </label>
                </div>
                <div class="field">
                    <label class="label">Heure : </label>
                </div>

                <div>
                    <p><button class="button is-success">OUI</button></p>
                    <p><button class="button is-danger">NON</button></p>
                </div>
            </div>
        </form>
        <p><button class="button is-info">Ajouter un évènement</button></p>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
    components: {
        Sidebar
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