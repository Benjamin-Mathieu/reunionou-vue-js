<template>
    <div>
        <button class="button new-event-button" @click="showForm" :class="{hide: hideCreateButton}">Créer un évènement</button>
        
        <!-- Si le bouton est cliqué alors le formulaire pour crée un event s'affiche -->
        <div v-if="show" id="create-event">
            <section>
                <h3>Ajout évènement</h3>
                <!-- Formulaire pour crée l'évènement (titre, description, adresse, date, public/privé) -->
                <form @submit.prevent="createEvent">
                        <input class="input" v-model="title" required type="text" placeholder="Titre" minlength="4" maxlength="80">
                        <input class="input" v-model="description" required type="text" placeholder="Description" minlength="0" maxlength="200">
                        <input class="input" v-model="adress" required type="text" placeholder="Adresse" ref="adress">
                        <p class="help is-danger hide" ref="invalidAdressTxt">L'adresse saisi est incorrect</p>
                        <input class="input" v-model="date" required type="date" ref="inputDate">
                        <p class="help is-danger hide" ref="invalidDateTxt">La date sélectionné doit être supérieur à la date d'aujourd'hui</p>
                        <input class="input" v-model="time" required type="time">
                        <label for="public">Publique</label>
                        <input class="checkbox" v-model="checkbox_public" type="checkbox" id="public">
                        <div>
                            <button class="button is-link" ref="createEvent">Créer un évènement</button>
                            <button type="button" @click="maskForm" class="button is-light">Annuler</button>
                        </div>
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
        }
    },
    methods: {
        showForm() {
            this.show = true;
        },
        maskForm() {
            this.show = false;
            this.title = '';
            this.description = '';
            this.adress = '';
            this.date = '';
            this.time = '';
            this.checkbox_public = false;
        },
        createEvent() {
            let jwt_token = this.$store.state.jwtToken;

            // Vérification de la date choisi pour l'évènement
            let selectedDate = new Date(this.date);
            let now = new Date();
                if (selectedDate < now) {
                    this.$refs.inputDate.classList.add("is-danger");
                    this.$refs.invalidDateTxt.classList.remove("hide");
                    this.$refs.createEvent.classList.remove("is-loading");
                    return;
                }
            
            let dateFormated = this.date + " " + this.time;
            this.$refs.createEvent.classList.add("is-loading");

            // Appel de l'API pour crée l'évènement et récupère les données (title, description, date, adress) tapées par l'utilisateur
            api.post("/events", {
                title: this.title,
                description: this.description,
                date: dateFormated,
                adress: this.adress,
                public: this.checkbox_public,
                main_event: 1
            }, {
                headers: {
                    "Authorization": "Bearer " + jwt_token
                }
            }).then(response => {
                this.$bus.$emit("getEvents");
                this.show = false;
                console.log(response.data)
            }).catch(error => {
                this.$refs.createEvent.classList.remove("is-loading");
                console.log(error.response.data.error);

                if(error.response.data.error == "Adress need to be more precise or wrong adress" || error.response.data.error == "No adress found") {
                    this.$refs.invalidAdressTxt.classList.remove("hide");
                    this.$refs.adress.classList.add("is-danger");
                }
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
        text-align: center;

        section {
            position: absolute;
            width: 50%;
            left: 50%; 
            top: 50%;
            transform: translate(-50%, -50%);
            background: whitesmoke;
            padding: 1em;
            border-radius: 1em;
            input {
                margin: .3rem;
            }
            button {
                margin: .7rem;
            }
        }
    }
</style>