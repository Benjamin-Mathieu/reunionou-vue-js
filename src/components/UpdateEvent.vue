<template>
    <div>
        <!-- Bouton pour afficher le modal du formulaire pour éditer l'évènement -->
        <button class="button is-small" @click="showForm" :class="{hide: hideEditButton}">
            <span>Editer</span>
            <span class="icon is-small">
                    <img src="../assets/edit-24dp.svg" alt="delete-icon">
            </span>
        </button>
        
        <!-- Si le bouton est cliqué alors le formulaire pour update l'event s'affiche -->
        <div v-if="show" class="update-event">
            <section>
                <!-- Formulaire (titre, description, adresse, date, publique/privé) -->
                <form @submit.prevent="updateEvent">
                        <input class="input" v-model="title" required type="text" placeholder="Titre" minlength="5">
                        <input class="input" v-model="description" required type="text" placeholder="Description" maxlength="300">
                        <input class="input" v-model="adress" required type="text" placeholder="Adresse" ref="adress">
                        <p class="help is-danger hide" ref="invalidAdressTxt">L'adresse saisi est incorrect</p>
                        <input class="input" v-model="date" required type="date">
                        <p class="help is-danger hide" ref="invalidDateTxt">La date sélectionné doit être supérieur à la date d'aujourd'hui</p>
                        <input class="input" v-model="time" required type="time">
                        <label for="public">Public</label>
                        <input class="checkbox" v-model="checkbox_public" type="checkbox" id="public">
                        <div>
                            <button class="button is-link" ref="editEventButton">Valider les changements</button>
                            <button type="button" @click="maskForm" class="button is-warning button-clear">Annuler</button>
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
            hideEditButton: true
        }
    },
    mounted() {
        // Si l'utilisateur n'est pas connecté alors le bouton pour modifier un évènement et retiré de l'affichage
        if(this.$store.state.jwtToken) {
            this.hideEditButton = false;
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
        updateEvent() {
            let jwt_token = this.$store.state.jwtToken;
            this.$refs.editEventButton.classList.add("is-loading");

            let selectedDate = new Date(this.date);
            let now = new Date();
                if (selectedDate < now) {
                    this.$refs.inputDate.classList.add("is-danger");
                    this.$refs.invalidDateTxt.classList.remove("hide");
                    this.$refs.editEventButton.classList.remove("is-loading");
                    return;
                }

            api.put("/events/" + this.$route.params.id, {
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
                this.$bus.$emit("getEvent");
                this.show = false;
                console.log(response.data)
            }).catch(error => {
                this.$refs.editEventButton.classList.remove("is-loading");
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
    .update-event {
        position: fixed; z-index: 1000;
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