<template>
  <div class="home">
    <div class="title">
      <h1>Connexion</h1>
    </div>

    <!-- Formulaire de connexion (mail, mdp) -->
    <form class="form-connexion" v-on:submit.prevent="connectAccount">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          E-mail
          <input class="input is-focused" type="email" placeholder="Email" v-model="email">
          <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left has-icons-right">
          Mot de passe
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control">
          <button class="button is-success">Connexion</button>
        </p>
      </div>

      <!-- Redirection vers la page d'inscription -->
      <div class="inscription"><router-link to="/inscription">Inscription</router-link></div>
    </form>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      email : 'test@test.fr',
      password : 'test',
      isClick : false
    }
  },

  methods: {
    switchForm() {
      this.isClick = !this.isClick;
    },
    connectAccount() {
      // Création du token avec le mail et le password pour l'envoyé à l'API
      let token = Buffer.from(this.email+':'+this.password+'', 'utf8').toString('base64');

      // Appel à l'API pour vérifié la connexion de l'utilisateur
      api.post("/signIn", {}, {
              headers: {
                'Authorization' : 'Basic ' + token,
              }
            }).then(response => {
                alert("Vous êtes bien connecté")
                let jwt_token = response.data;
                let decoded = jwt_decode(jwt_token);
                console.log(decoded);
                // Stockage du JWT dans le store lorsque la requête est bien exécuté
                this.$store.commit("setToken", jwt_token);
                console.log(this.$store.state.jwtToken);
                this.$router.push("/events")
            }).catch(error => {
                alert(error.response.data.message)
            })
    }
  }
}
</script>

<style lang="scss" scoped>

  .home {
    height: 50vh;
    display: flex; flex-direction: column; justify-content: center; align-items: center;

    .input{
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      background: white;
    }

    .inscription{
      text-align: center;
    }

  }
  
</style>
