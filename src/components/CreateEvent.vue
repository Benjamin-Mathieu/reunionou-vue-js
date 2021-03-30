<template>
    <div>
        <button class="button new-event-button" @click="showForm" :class="{hide: hideCreateButton}">Créer un évènement</button>
        
        <!-- Si le bouton est cliqué alors le formulaire pour crée un event s'affiche -->
        <div v-if="show" id="create-event">
            <section>
                <h3>Ajout évènement</h3>
                <!-- Formulaire pour crée l'évènement (titre, description, adresse, date, public/privé) -->
                <form @submit.prevent="createEvent">
                        <div><input v-model="title" required type="text" placeholder="Titre"></div>
                        <div><input v-model="description" required type="text" placeholder="Description"></div>
                        <div><input v-model="adress" required type="text" placeholder="Adresse"></div>
                        <div><input v-model="date" required type="date"></div>
                        <!-- <div><input v-model="time" required type="time"></div> -->
                        <div>
                            <label for="public">Public</label>
                            <input v-model="checkbox_public" type="checkbox" id="public">
                        </div>
                        <button class="button is-link">Créer un évènement</button>
                        <button type="button" @click="maskForm" class="button is-warning button-clear">Annuler</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            close: false,
            title: '',
            description: '',
            adress: '',
            date: '',
            time: '',
            checkbox_public: false,
            hideCreateButton: true
        }
    },
    mounted() {
        if(this.$store.state.jwtToken) {
            this.hideCreateButton = false;
            console.log('test')
        }
    },
    methods: {
        showForm() {
            this.show = true;
        },
        maskForm() {
            this.show = false;
        },
        createEvent() {
            let jwt_token = this.$store.state.jwtToken;

            // Appel de l'API pour crée l'évènement et récupère les données (title, description, date, adress) tapées par l'utilisateur
            api.post("/events", {
                title: this.title,
                description: this.description,
                date: this.date,
                adress: this.adress,
                public: this.checkbox_public,
                main_event: 1
            }, {
                headers: {
                    "Authorization": "Bearer " + jwt_token
                }
            }).then(response => {
                alert("Event created");
                console.log(response.data.token)
                console.log(response.data.id)
                this.$router.push("/event/" + response.data.id + '?token=' + response.data.token);
                console.log(response.data)
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #create-event {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);

        section {
        position: absolute;
        left: 50%; 
        top: 50%;
        transform: translate(-50%, -50%);
        background: whitesmoke;
        padding: 1em;
        border-radius: 1em;

        h3 {
            color:#363636;
        }

        .close {
            position: absolute;
            top: -1em;
            right: -1em;
            width: 3em;
            height: 3em;
            line-height: 3em;
            margin: 0;
            padding: 0;
            border-radius: 50%;
        }
        .close:hover {
            cursor: pointer;
        }

        form {
        border: none;
        text-align: center;

        div {
            margin: .5em;

            input {
                padding: 0.3em;
                margin: 0.3em;
                border-top: none; border-left: none; border-right: none;
                border-bottom: 1px solid #2750B8;
                border-radius: .3em;
                width: 100%;
            }
        }
    }}
    }
</style>