<script>
export default {
  name: "pageNotFoundComponent",
  title:"Page not found",
  computed: {
    route() {
      return this.$route.fullPath;
    }
  }
}
</script>

<template>
  <div class="content-page-not-found">
    <h2>ERROR 404</h2>
    <p> {{ route }} no ha sido encontrada</p>
    <router-link class="button" to="/my-wallets">Regresar</router-link>
  </div>
</template>

<style scoped>
.content-page-not-found {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
}
h2 {
  color: #2C3E50;
}
.button {
  margin-top: 1em;
  border-radius: 2em;
  padding: 0.5em 1em;
  background-color: #27AE60;
  color: white;
  text-decoration: none;
}
</style>