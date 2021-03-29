<template>
    <div class="newMdp">
        <form class="form-nouveauMdp" v-on:submit.prevent="updatePassword">
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="previous">Ancien mot de passe</label>
                        <p class="control has-icons-left">
                            <input v-model="password" class="input" type="password" ref="password1">
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="control has-icons-left"></p>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="new">Nouveau mot de passe</label>
                        <p class="control has-icons-left">
                            <input v-model="newPassword " class="input" type="password" ref="password2">
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                        <p class="control has-icons-left"></p>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="confirmNew">Confirmer le nouveau mot de passe</label>
                        <input v-model="confirmNewPassword" class="input" type="password" ref="password3">
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
    // data(){
    //     return {
    //         password: '',
    //         newPassword : '',
    //         confirmNewPassword: ''
    //     }
    // },
    // methods: {
    //     updatePassword() {
    //         if(this.newPassword != this.confirmNewPassword) {
    //             this.$refs.password3.classList.add('is-danger');
    //             this.$refs.password2.classList.add('is-danger');
    //             console.log('wrong passwords')

    //             if(this.confirmNewPassword == this.password) {
    //                 this.$refs.password3.classList.add('is-danger');
    //                 this.$refs.password1.classList.add('is-danger');
    //                 console.log('same passwords')
    //             }
    //         }else {
    //             api.put("/udpate", {
    //                 password : this.password
    //             }).then(response => {
    //                 alert("le mot de passe a été modifié")
    //                 console.log(response.data)
    //                 this.$router.push("/profil")
    //             }).catch(error => {
    //                 alert(error.reponse.data.message)
    //             })
    //         }
    //     }
    // }
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