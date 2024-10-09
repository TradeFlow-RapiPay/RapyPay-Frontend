<script>
export default {
  name: "ToolbarRapi",
  data() {
    return {
      selectedItem: null,
      items: [
        {
          label: 'Mis carteras',
          icon: 'pi pi-wallet',
          command: () => {
            this.selectedItem = 'Mis carteras';
            this.$router.push('/my-wallets');
          },
          class: 'wallet-item'
        },
        {
          label: 'Bancos',
          icon: 'pi pi-building-columns',
          command: () => {
            this.selectedItem = 'Bancos';
            this.$router.push('/banks');
          },
          class: 'bank-item'
        }
      ]
    }
  }
}
</script>

<template>
  <pv-toolbar class="toolbar-component">
    <template #start>
      <img src="https://github.com/user-attachments/assets/6c4d80f9-13bf-4c64-993c-34c76f5ef014" alt="logo-RapiPay" />
    </template>
    <template #center>
      <pv-menubar class="menu-bar-items" :model="items">
        <template v-slot:item="slotProps">
          <li :class="{'selected-item': selectedItem === slotProps.item.label}">
            <a @click="slotProps.item.command">
              <i :class="slotProps.item.icon"></i>
              <span>{{ slotProps.item.label }}</span>
            </a>
          </li>
        </template>
      </pv-menubar>
    </template>
    <template #end>
      <button class="btn btn-new-wallet" @click="">+ Nueva cartera</button>
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
.menu-bar-items{
  margin-left: auto;
  font-size: 24px;
  color: #2C3E50;
  padding: 0.6em;
}
.menu-bar-items li {
  cursor: pointer;
  padding: 0.5em;
}
.selected-item {
  color: #27AE60;
  text-decoration: underline ;
}
</style>