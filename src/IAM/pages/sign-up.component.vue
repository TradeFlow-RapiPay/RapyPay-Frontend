<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";
import {AuthenticationService} from "@/iam/services/authentication.service.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      authenticationService: null,
      username: "",
      password: "",
    };
  },
  created() {
    this.authenticationService = new AuthenticationService();
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password,);
      console.log(signUpRequest);
      this.authenticationStore.signUp(signUpRequest, this.$router);

    }
  }
}
</script>

<template>
  <img src="https://github.com/user-attachments/assets/6c4d80f9-13bf-4c64-993c-34c76f5ef014" alt="logo-RapiPay" />
  <div class="container">
    <div class="signup">
      <h2 class="title">Registrate!</h2>
      <form @submit.prevent="onSignUp">
        <div>
          <div>
            <pv-float-label>
              <label class="label-input" for="username">Usuario</label>
              <pv-input-text class="input" id="username" v-model="username" :class="{'p-invalid': !username}"/>
              <small v-if="!username" class="p-invalid">Nombre de usuario es requerido</small>
            </pv-float-label>
          </div>
          <div>
            <pv-float-label>
              <label class="label-input"  for="password">Contraseña</label>
              <pv-input-text class="input" id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
              <small v-if="!password" class="p-invalid">Contraseña es requerida</small>
            </pv-float-label>
          </div>
          <div class="registration-question">
            <a>
              <router-link style="text-decoration: none !important;" :to="{ path: '/login' }">
                <span class="route-to-registration">Tengo una cuenta</span>
              </router-link>
            </a>
          </div>
          <div>
            <pv-button class="btn-register" type="submit">Registrar</pv-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
img{
  margin: 1em;
  width: 80px;
  height: fit-content;
}
.container {
  margin-top: 3em;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
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
  color: #8BB500D6;
}
.route-to-registration {
  text-decoration: none;
  color: #95a53a;
}
.input {
  width: 100% !important;
  height: 3em;
  border-radius: 5px;
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
  background-color: #C5D951FF;
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
  background-color: #8BB500D6;
  transform: scale(1.1);
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
</style>