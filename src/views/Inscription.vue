<template>
    <div class="inscription">
        <form class="form-connexion" v-on:submit.prevent="createAccount">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Nom</label>
                        <div class="control">
                        <input class="input" type="text" placeholder="Text input">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Prénom</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input">
                        </div>
                        <!-- <p class="help is-success">This username is available</p> -->
                    </div>
                </div>
            </div>
            
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email input">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <!-- <p class="help is-danger">This email is invalid</p> -->
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Mot de passe</label>
                        <p class="control has-icons-left">
                            <input class="input" type="password">
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="control has-icons-left"></p>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label">Confirmer le mot de passe</label>
                        <input class="input" type="password">
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
    methods: {
        createAccount() {
            alert('Test');
        }
    }
}
</script>

<style lang="scss" scoped>
    .inscription {
        height: 100vh;
        text-align: center;
        display: flex; flex-direction: column; justify-content: center; align-items: center;

        .form-connexion {
            padding: 1em;
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
        }
    }
</style>