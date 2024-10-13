<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import router from "@/router/index.js";

export default {
  name: "authentication-section",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      activeButton: null
    };
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    currentUsername() {
      return this.authenticationStore.currentUsername;
    },
  },
  methods: {
    onSignIn() {
      this.activeButton = 'sign-in';
      router.push({name: 'sign-in'});
    },
    onSignUp() {
      this.activeButton = 'sign-up';
      router.push({name: 'sign-up'});
    },
    onSignOut() {
      this.authenticationStore.signOut(router);
    },
    updateActiveButton() {
      if (router.currentRoute.value.name === 'sign-in') {
        this.activeButton = 'sign-in';
      } else if (router.currentRoute.value.name === 'sign-up') {
        this.activeButton = 'sign-up';
      } else {
        this.activeButton = null;
      }
    }
  },
  created() {
    this.updateActiveButton();
  },
  watch: {
    '$route'() {
      this.updateActiveButton();
    }
  }
}
</script>

<template>
  <div>
    <div v-if="isSignedIn">
      <a class="welcome"> Welcome,
        <span>{{ currentUsername }}</span>
      </a>
      <a class="signout" @click="onSignOut">Sign Out</a>
    </div>
    <div v-else>
      <a :class="['signin', { active: activeButton === 'sign-in' }]" @click="onSignIn"> Sign in</a>
      <a :class="['signup', { active: activeButton === 'sign-up' }]" @click="onSignUp">Sign up</a>
    </div>
  </div>
</template>

<style scoped>
a {
  font-family: Nunito, sans-serif;
  text-decoration: none;
  font-size: 24px;
  padding: 0.6em;
  cursor: pointer;
  border: none;
  color: #2C3E50;
  background-color: rgba(126, 137, 64, 0);
  align-items: center;
  width: auto !important;
  border-radius: 5px;
}

.welcome {
  background-color: white;
  border: 1px solid white;
  padding: 5px;
}

.signin:hover, .signup:hover {
  background-color: #f1f5f9;
}
.signin.active, .signup.active {
  padding: 0.7em;
  color:  #27AE60;
  text-decoration: underline ;
  background-color: #f1f5f9;
}

.signin:active, .signup:active {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.signout {
  background-color: rgba(239, 82, 82, 0.65);
  padding: 5px;
  color: white;
}

span {
  font-weight: 800 !important;
}
</style>