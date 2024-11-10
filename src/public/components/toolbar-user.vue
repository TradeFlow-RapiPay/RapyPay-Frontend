<script>
import AuthenticationSection from "@/IAM/components/authentication-sector.vue";

export default {
  name: "toolbar-user",
  components: { AuthenticationSection },
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
    },
    showNewWalletCard() {
      this.$emit('show-new-wallet-card');
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
      <img src="https://github.com/user-attachments/assets/5afe8540-75c5-467d-ae79-e92e936e8beb" alt="logo-RapiPay"/>
    </template>
    <template #center>
      <pv-menubar class="menu-bar-items" :model="items">
        <template class="flex items-center" v-slot:item="slotProps">
          <li :class="['items-toolbar',{'selected-item': selectedItem === slotProps.item.label}]">
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
    </template>
  </pv-toolbar>
</template>

<style scoped>
img {
  margin: 1em;
  width: 80px;
  height: fit-content;
}

.toolbar-component {
  background-color: rgba(44, 62, 80, 0.1);
  padding: 0;
  margin: 0;
}

.menu-bar-items {
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


.authentication{
  background-color: rgba(44, 62, 80, 0);
}

.flex {
  display: flex;
}



@media (max-width: 950px) {
  img {
    width: 60px;
  }

  .label-item {
    display: none;
  }
  :deep(.p-toolbar-center) {
    justify-content: end;
    align-items: center;
  }
}

:deep(.p-toolbar-center) {
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centra el elemento horizontal y verticalmente */
}
</style>