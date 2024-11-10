<script>
import AuthenticationSection from "@/IAM/components/authentication-sector.vue";

export default {
  name: "toolbar-default",
  components: { AuthenticationSection  },
}
</script>

<template>
  <pv-toolbar class="toolbar-component">
    <template #start>
      <img src="https://github.com/user-attachments/assets/5afe8540-75c5-467d-ae79-e92e936e8beb" alt="logo-RapiPay"/>
    </template>
    <template #end>
      <authentication-section class="authentication"/>
    </template>
  </pv-toolbar>
</template>

<style scoped>
.toolbar-component{
  padding:0.3rem;
}
img {
  margin: 1em;
  width: 80px;
  height: fit-content;
}
.authentication{
  background-color: rgba(44, 62, 80, 0);
}


@media (max-width: 950px) {
  img {
    width: 60px;
  }
}
</style>