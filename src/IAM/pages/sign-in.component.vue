<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  methods: {
    onSignIn() {
      this.submitted = true;
      if (this.username && this.password) {
        let authenticationStore = useAuthenticationStore();
        let signInRequest = new SignInRequest(this.username, this.password);
        authenticationStore.signIn(signInRequest, this.$router, this.$toast);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="login">
      <img src="https://github.com/user-attachments/assets/5afe8540-75c5-467d-ae79-e92e936e8beb" alt="logo-RapiPay" />
      <h2 class="title">Bienvenido de vuelta!</h2>
    </div>
    <form @submit.prevent="onSignIn">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label class="p-float-label">
            <label class="label-input" for="username">Usuario</label>
            <pv-input-text class="input" id="username" v-model="username" :class="{'p-invalid': submitted && !username}"/>
            <small v-if="submitted && !username" class="p-invalid">Username es requerido.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label class="p-float-label">
            <label class="label-input" for="password">Contraseña</label>
            <pv-input-text class="input" id="password" v-model="password" :class="{'p-invalid': submitted && !password}" type="password"/>
            <small v-if="submitted && !password" class="p-invalid">Contraseña es requerida</small>
          </pv-float-label>
        </div>
        <div class="registration-question">
          <router-link style="text-decoration: none !important;" :to="{ path: '/sign-up' }">
            <span class="text-registro">¿No tienes una cuenta aún?</span> <span class="route-to-registration">Crear cuenta</span>
          </router-link>
        </div>
      </div>
      <div class="button-container">
        <pv-button class="btn-register" type="submit">Iniciar sesión</pv-button>
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
.text-registro{
  color: #666;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4em;
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
  color: #27AE60;
}
.route-to-registration {
  text-decoration: none;
  color: #27AE60;
}
.p-float-label {
  margin-bottom: 20px;
  width: 100%;
}
.input, .p-invalid {
  width: 387.4px !important;
  height: 3em;
  border-radius: 1.6em;
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
  background-color: #27AE60;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  padding: 15px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.btn-register:hover {
  background-color: #27AE60;
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
