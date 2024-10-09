<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <img src="https://github.com/user-attachments/assets/6c4d80f9-13bf-4c64-993c-34c76f5ef014" alt="logo-RapiPay" />
  <div class="container">
    <div class="login">
      <h2 class="title">Bienvenido de vuelta!</h2>
    </div>
    <form @submit.prevent="onSignIn">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label class="p-float-label">
            <label  class="label-input" for="username">Usuario</label>
            <pv-input-text class="input" id="username" v-model="username" :class="{'p-invalid': !username}"/>
            <small v-if="!username" class="p-invalid">Username es requerido.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label class =p-float-label>
            <label class="label-input" for="password">Contraseña</label>
            <pv-input-text class="input" id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
            <small v-if="!password" class="error-message">Contraseña incorrecta</small>
          </pv-float-label>
        </div>
        <div class="registration-question">
          <router-link style="text-decoration: none !important;" :to="{ path: '/sign-up' }">
            <span  class="route-to-registration">No tengo una cuenta</span>
          </router-link>
        </div>
      </div>
      <div class="button-container">
        <pv-button class="btn-register"  type="submit">Iniciar sesión</pv-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
img{
  margin: 1em;
  width: 80px;
  height: fit-content;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login {
  text-align: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
.login .title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #8BB500D6;
}
.route-to-registration {
  text-decoration: none;
  color: #95a53a;
}
.p-float-label {
  margin-bottom: 20px;
  width: 100%;
}
.input {
  width: 100% !important;
  height: 3em;
  border-radius: 5px;
}
.label-input {
  color: #666;
}
.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  color: rgba(80, 222, 58, 0.81);
  display: none;
  font-size: 14px;
  margin-top: 4px;
}
.registration-question {
  align-items: center;
  justify-content: center;
}
.button-container {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.btn-register {
  background-color: #C5D951FF;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  padding: 15px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.btn-register:hover {
  background-color: #8BB500D6;
  transform: scale(1.1);
}
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  .title {
    font-size: 28px;
  }
  .description {
    font-size: 18px;
  }
  .btn-register {
    font-size: 16px;
    padding: 10px 20px;
  }
}
</style>
