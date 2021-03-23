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
