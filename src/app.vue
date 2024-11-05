<script>
import {useAuthenticationStore} from "@/IAM/services/authentication.store.js";
import ToolbarUser from "@/public/components/toolbar-user.vue";
import ToolbarDefault from "@/public/components/toolbar-default.vue";
import {computed} from 'vue';

export default {
  name: "app.vue",
  components: {ToolbarDefault, ToolbarUser},
  setup() {
    const authenticationStore = useAuthenticationStore();
    const role = computed(() => authenticationStore.role);
    return { role};
  }
}
</script>

<template>
  <pv-toast></pv-toast>
  <div v-if="role === 'ROLE_USER'">
    <toolbar-user/>
  </div>
  <div v-else-if="role === 'ROLE_ADMIN'">
    <toolbar-default/>
  </div>
  <div v-else>
    <toolbar-default/>
  </div>
  <router-view/>
</template>

<style scoped>
</style>