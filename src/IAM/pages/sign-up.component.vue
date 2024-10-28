<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";
import {AuthenticationService} from "@/iam/services/authentication.service.js";
import {ref} from "vue";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      authenticationService: null,
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      submitted: false,
      errorMessage: "",
      roles: ref([
        { name: 'ROLE_USER', code: 'ROLE_USER' },
        { name: 'ROLE_ADMIN', code: 'ROLE_ADMIN' }
      ])
    };
  },
  created() {
    this.authenticationService = new AuthenticationService();
  },
  methods: {
    onSignUp() {
      this.submitted = true;
      if (this.username && this.password && this.confirmPassword) {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = "Las contraseñas no coinciden.";
          return;
        }
        console.log(this.role);
        let signUpRequest = new SignUpRequest(this.username, this.password, this.role);
        this.authenticationStore.signUp(signUpRequest, this.$router, this.$toast);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="signup">
      <img src="https://github.com/user-attachments/assets/5afe8540-75c5-467d-ae79-e92e936e8beb" alt="logo-RapiPay" />
      <h2 class="title">Registrate!</h2>
    </div>
    <form @submit.prevent="onSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label class="label-input" for="username">Usuario</label>
            <pv-input-text class="input" id="username" v-model="username" :class="{'p-invalid': submitted && !username}"/>
            <small v-if="submitted && !username" class="p-invalid">Username es requerido.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label class="label-input" for="password">Contraseña</label>
            <pv-input-text class="input" id="password" v-model="password" :class="{'p-invalid': submitted && !password}" type="password"/>
            <small v-if="submitted && !password" class="p-invalid">Contraseña es requerida</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label class="label-input" for="confirmPassword">Confirmar Contraseña</label>
            <pv-input-text class="input" id="confirmPassword" v-model="confirmPassword" :class="{'p-invalid': submitted && !confirmPassword}" type="password"/>
            <br>
            <small v-if="submitted && !confirmPassword" class="p-invalid">Confirmar Contraseña es requerida</small>
            <small v-if="errorMessage" class="p-invalid">{{ errorMessage }}</small>
          </pv-float-label>
        </div>
        <div>
          <label for="role">Rol:</label>
          <select v-model="role" id="role" required>
            <option value="ROLE_USER">Usuario</option>
            <option value="ROLE_ADMIN">Administrador</option>
          </select>
        </div>

        <div class="registration-question">
          <router-link style="text-decoration: none !important;" :to="{ path: '/login' }">
            <span class="text-iniciosesion">Ya tengo una cuenta</span> <span class="route-to-registration">Iniciar sesión</span>
          </router-link>
        </div>
        <div class="button-container">
          <pv-button class="btn-register" type="submit">Registrar</pv-button>
        </div>
      </div>
    </form>
    <pv-toast />
  </div>
</template>

<style scoped>
img{
  margin: 1em;
  width: 80px;
  height: fit-content;
}
.text-iniciosesion{
  color: #666;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4em;

}
.signup {
  text-align: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
.signup .title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #27AE60;
}
.route-to-registration {
  text-decoration: none;
  color: #27AE60;
}
.input, .p-invalid {
  width: 387.4px !important;
  height: 3em;
  border-radius: 1.6em;
}
.label-input {
  color: #666;
}
.registration-question {
  align-items: center;
  justify-content: center;
}
.go-to-registration {
  color: black;
  font-weight: 700;
}
pv-password {
  width: 100% !important;
}
.btn-register {
  background-color: #27AE60;
  margin-top: 1.5em;
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
.button-container {
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .signup {
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
label {
  display: block;
  margin-bottom: 0.5em;
}

input, select, textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
}
form div {
  margin-bottom: 1em;
}
</style>