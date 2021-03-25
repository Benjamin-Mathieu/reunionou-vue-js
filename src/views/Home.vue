<template>
  <div class="home">
      <form class="form-connexion" v-on:submit.prevent="connectAccount">
        <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email"  v-model="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
    </div>

    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <p class="control">
        <button class="button is-success">Login</button>
      </p>
    </div>
    <router-link to="/inscription">Crée un compte</router-link>
    </form>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      email : '',
      password : '',
      isClick : false
    }
  },

  methods: {
    switchForm() {
      this.isClick = !this.isClick;
    },
    connectAccount() {
      console.log(this.email, this.password);
      let token = Buffer.from(this.email+':'+this.password+'', 'utf8').toString('base64');

      api.post("/signIn", {}, {
              headers: {
                'Authorization' : 'Basic ' + token,
              }
            }).then(response => {
                alert("Vous êtes bien connecté")
                var jwt_token = response.data;
                var decoded = jwt_decode(jwt_token);
                console.log(decoded);
                // this.$router.push("/events")
            }).catch(error => {
                alert(error.response.data.message)
            })
    }
  }
}
</script>

<style lang="scss" scoped>

  .home {
    height: 100vh;
    text-align: center;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    
  }
  
</style>
