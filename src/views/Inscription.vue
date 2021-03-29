<template>
    <div class="inscription">
        <form class="form-inscription" v-on:submit.prevent="createAccount">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Nom</label>
                        <div class="control">
                        <input v-model="name" class="input is-focused" type="text">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Prénom</label>
                        <div class="control">
                            <input v-model="firstname" class="input" type="text">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control has-icons-left has-icons-right">
                    <input v-model="mail" class="input" type="email" placeholder="Email input">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Mot de passe</label>
                        <p class="control has-icons-left">
                            <input v-model="password" class="input" type="password" ref="password1">
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="control has-icons-left"></p>
                    </div>
                        <p class="help is-danger">Password invalid</p>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Confirmer le mot de passe</label>
                        <input v-model="confirm_password" class="input" type="password" ref="password2">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>           
                    </div>
                </div>
            </div>
            <div class="control">
                <button class="button is-link">S'inscrire</button>
            </div>   
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            name: '',
            firstname: '',
            mail: '',
            password: '',
            confirm_password: ''
        }
    },
    methods: {
        createAccount() {
            let token = Buffer.from(this.email+':'+this.password+'', 'utf8').toString('base64');

            // Vérification si les 2 inputs de vérification de mdp sont corrects et si c'est ok exécution de la requête pour crée un utilisateur
            if(this.password != this.confirm_password) {
                this.$refs.password2.classList.add('is-danger');
                this.$refs.password1.classList.add('is-danger');
                console.log('wrong passwords')
            } else {
                api.post("/signUp", {
                    name : this.name,
                    firstname : this.firstname,
                    mail : this.mail,
                    password : this.password
                }, {
                headers: {
                    'Authorization' : 'Basic ' + token,
                }
                }).then(response => {
                    alert("Le compte a été crée")
                    console.log(response.data)
                    this.$router.push("/events")
                }).catch(error => {
                    alert(error.response.data.message)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .inscription {
        height: 100vh;
        text-align: center;
        display: flex; flex-direction: column; justify-content: center; align-items: center;

        .form-inscription {
            padding: 1em;
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
        }
    }
</style>