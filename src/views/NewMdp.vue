<template>
    <div class="newMdp">
        <form class="form-nouveauMdp" v-on:submit.prevent="newPassword">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label">Ancien mot de passe</label>
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
                        <label class="label">Nouveau mot de passe</label>
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
                        <label class="label">Confirmer le nouveau mot de passe</label>
                        <input class="input" type="password">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>           
                    </div>
                </div>
            </div>
            <div class="control">
                <button class="button is-success">Valider</button>
            </div>
        </form> 
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .newMdp {
        height: 100vh;
        text-align: center;
        display: flex; flex-direction: column; justify-content: center; align-items: center;

        .form-nouveauMdp {
            padding: 1em;
            background: #FFFFFF;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 10px;

        }
    }
</style>