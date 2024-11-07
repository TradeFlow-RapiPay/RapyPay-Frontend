<script>
import { useAuthenticationStore } from "../services/authentication.store.js";
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
    currentUserId() {
      return this.authenticationStore.currentUserId;
    }
  },
  methods: {
    onSignIn() {
      this.activeButton = 'sign-in';
      router.push({ name: 'sign-in' });
    },
    onSignUp() {
      this.activeButton = 'sign-up';
      router.push({ name: 'sign-up' });
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
    <div v-if="isSignedIn">
      <a class="welcome"> Welcome,
        <span>{{ currentUsername }} {{currentUserId}}</span>
      </a>
      <a class="signout" @click="onSignOut">Sign Out <i class="pi pi-sign-out" style="font-size: 1rem"></i>
      </a>
    </div>
    <div v-else>
      <pv-button :class="['signin', { active: activeButton === 'sign-in' }]" @click="onSignIn"> Sign in</pv-button>
      <pv-button :class="['signup', { active: activeButton === 'sign-up' }]" @click="onSignUp">Sign up</pv-button>
    </div>
</template>

<style scoped>
a {
  font-family: Nunito, sans-serif;
  text-decoration: none;
  font-size: 22px;
  padding: 0.6em;
  cursor: pointer;
  color: #2C3E50;
  background-color: rgba(126, 137, 64, 0);
  align-items: center;
  width: auto !important;
  border-radius: 2em;
}

.welcome {
  border: none;
}

.signin {
  color: #27AE60;
  font-size: 18px;
  border-color: #27AE60;
  background-color: rgba(39, 174, 96, 0);
  border-radius: 2em;
  padding: 15px 30px;
  cursor: pointer;
  margin-right: 1em;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.signin:hover {
  background-color: #27AE60;
  color:white;
  transform: scale(1.1);
}

.signup{
  background-color: #27AE60;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  padding: 15px 30px;
  cursor: pointer;
  margin-right: 1em;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.signup:hover {
  background-color: #2cdc78;
  transform: scale(1.1);
}

.signout {
  color: indianred;
  font-weight: bolder;
  border: none;
  border-radius: 2em;
  padding: 13px;
  cursor: pointer;
  margin-right: 1em;
  transition: color 0.3s ease, transform 0.3s ease;
}

.signout:hover {
  color: #a41f12;
  transform: scale(1.05);
}

span {
  font-weight: 800 !important;
}
</style>