<script>
import AuthenticationSection from "@/IAM/components/authentication-sector.vue";

export default {
  name: "ToolbarRapi",
  components: {AuthenticationSection},
  data() {
    return {
      selectedItem: null,
      items: [
        {
          label: 'Mis carteras',
          icon: 'pi pi-wallet',
          command: () => {
            this.updateSelectedItem();
            this.$router.push('/my-wallets');
          },
          class: 'wallet-item'
        },
        {
          label: 'Bancos',
          icon: 'pi pi-building-columns',
          command: () => {
            this.updateSelectedItem();
            this.$router.push('/banks');
          },
          class: 'bank-item'
        }
      ]
    }
  },
  watch: {
    '$route'() {
      this.updateSelectedItem();
    }
  },
  methods: {
    updateSelectedItem() {
      const routeName = this.$route.name;
      if (routeName === 'my-wallets') {
        this.selectedItem = 'Mis carteras';
      } else if (routeName === 'banks') {
        this.selectedItem = 'Bancos';
      } else if (routeName === 'sign-in' || routeName === 'sign-up') {
        this.selectedItem = null;
      }
    }
  },
  created() {
    this.updateSelectedItem();
  }
}
</script>

<template>
  <pv-toolbar class="toolbar-component">
    <template #start>
      <img src="https://github.com/user-attachments/assets/5afe8540-75c5-467d-ae79-e92e936e8beb" alt="logo-RapiPay" />
    </template>
    <template #center>
      <pv-menubar class="menu-bar-items" :model="items">
        <template class="flex items-center" v-slot:item="slotProps">
          <li :class="{'selected-item': selectedItem === slotProps.item.label}">
            <a @click="slotProps.item.command">
              <i :class="slotProps.item.icon"></i>
              <span class="label-item">{{ slotProps.item.label }}</span>
            </a>
          </li>
        </template>
      </pv-menubar>
    </template>
    <template #end>
      <authentication-section class="authentication"/>
      <div class="flex items-center justify-center ">
        <button class="btn btn-new-wallet" @click="">+ Nueva cartera</button>
      </div>
    </template>
  </pv-toolbar>
</template>

<style scoped>
img{
  margin: 1em;
  width: 80px;
  height: fit-content;
}

.toolbar-component {
  background-color: rgba(44, 62, 80, 0.1);
  padding: 0;
  margin: 0;
}
.btn-new-wallet{
  background-color: #27AE60;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  font-family: 'Ubuntu', sans-serif;
  margin: 1em;
  cursor: pointer;
  border-radius: 20px;
}
.btn-new-wallet:hover {
  background-color: #2cdc78;
}

.menu-bar-items{
  font-size: 24px;
  color: #2C3E50;
  padding: 0.6em;
  background-color: rgba(126, 137, 64, 0);
  border: none;
  display: flex;
  align-items: center;
  width: auto !important;
}
.menu-bar-items li {
  cursor: pointer;
  padding: 0.7em;
  border-radius: 2em;
}
.menu-bar-items span {
  padding: 0.7em;
}
.selected-item {
  color: #27AE60;
  text-decoration: underline ;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}

@media (max-width: 950px) {
  .btn-new-wallet {
    font-size: 18px;
  }
  img {
    width: 60px;
  }
  .label-item{
    display: none;
  }

}
</style>