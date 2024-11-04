<script>
import ToolbarRapi from "@/public/components/toolbarRapi.vue";
import {useAuthenticationStore} from "@/IAM/services/authentication.store.js";

export default {
  name: "app.vue",
  components: { ToolbarRapi }
}
</script>

<template>
  <pv-toast></pv-toast>
  <toolbar-rapi/>
  <router-view />
</template>

<style scoped>
</style>