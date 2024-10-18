<script>
import { WalletApiService } from "@/walletManagement/services/wallet-api.service.js";
import { Wallet } from "@/walletManagement/model/wallet.entity.js";
import { BankApiService } from "@/bankManagement/services/bank-api.service.js";

export default {
  name: "walletManagementComponent",
  title: 'Wallet Management',
  data() {
    return {
      showNewWalletCard: false,
      newWallet: new Wallet(),
      banks: [],
      wallets: [],
      walletApiService: new WalletApiService(),
      bankApiService: new BankApiService(),
      errorMessage: ''
    };
  },
  created() {
    this.fetchBanks().then(() => {
      this.fetchWallets();
    });
  },
  methods: {
    async fetchBanks() {
      try {
        const response = await this.bankApiService.getAll();
        this.banks = response.data;
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    },
    async fetchWallets() {
      try {
        const response = await this.walletApiService.getAllWallet();
        this.wallets = await Promise.all(response.data.map(async wallet => {
          const bankResponse = await this.bankApiService.getBankById(wallet.bank);
          const bank = bankResponse.data;
          return {
            ...wallet,
            bankName: bank ? bank.bankName : "Unknown Bank"
          };
        }));
      } catch (error) {
        console.error("Error fetching wallets:", error);
      }
    },
    toggleNewWalletCard() {
      this.showNewWalletCard = !this.showNewWalletCard;
    },
    async createWallet() {
      try {
        // Transformar la fecha al formato DD-MM-YYYY
        const [year, month, day] = this.newWallet.closingDate.split('-');
        const formattedDate = `${day}-${month}-${year}`;

        const response = await this.walletApiService.postWallet({
          walletName: this.newWallet.walletName,
          bank: this.newWallet.bank,
          description: this.newWallet.description,
          closingDate: formattedDate, // Usar la fecha formateada
          totalDiscount: this.newWallet.totalDiscount,
          totalNetValue: this.newWallet.totalNetValue
        });

        const bank = this.banks.find(b => b.id === response.data.bank);
        this.wallets.push({
          ...response.data,
          bankName: bank ? bank.bankName : "Unknown Bank"
        });
        this.newWallet = new Wallet();
        this.showNewWalletCard = false;
        this.errorMessage = '';
      } catch (error) {
        console.error("Error creating wallet:", error);
        if (error.response && error.response.status === 403) {
          this.errorMessage = 'You do not have permission to create a wallet.';
        } else {
          this.errorMessage = 'An error occurred while creating the wallet.';
        }
      }
    },
    cancelCreation() {
      this.newWallet = new Wallet();
      this.showNewWalletCard = false;
      this.errorMessage = '';
    },
    openBillManagement(walletId) {
      this.$router.push({name: 'bill-management', params: {walletId}});
    }
  }
};
</script>

<template>
  <div>
    <h1>Mis carteras</h1>
    <button @click="toggleNewWalletCard">+ Nueva cartera</button>
    <div v-if="showNewWalletCard" class="new-wallet-card">
      <h2>Registrar nueva cartera</h2>
      <form @submit.prevent="createWallet">
        <div>
          <label for="walletName">Nombre de la cartera:</label>
          <input v-model="newWallet.walletName" id="walletName" required/>
        </div>
        <div>
          <label for="bank">Banco:</label>
          <select v-model="newWallet.bank" id="bank" required>
            <option v-for="bank in banks" :key="bank.id" :value="bank.id">{{ bank.bankName }}</option>
          </select>
        </div>
        <div>
          <label for="description">Descripción:</label>
          <textarea v-model="newWallet.description" id="description"></textarea>
        </div>
        <div>
          <label for="closingDate">Fecha de cierre:</label>
          <input type="date" v-model="newWallet.closingDate" id="closingDate" required/>
        </div>
        <button type="submit">Guardar</button>
        <button type="button" @click="cancelCreation">Cancelar</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <div class="wallet-cards">
      <div v-for="wallet in wallets" :key="wallet.id" class="wallet-card" @click="openBillManagement(wallet.id)">
        <h3>{{ wallet.walletName }}</h3>
        <p>ID: {{ wallet.id }}</p>
        <p>Banco: {{ wallet.bankName }}</p>
        <p>Fecha de cierre: {{ wallet.closingDate }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 3em;
  margin-top: 2em;
}

button {
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

button:hover {
  background-color: #2cdc78;
}

.new-wallet-card {
  background-color: #f8f9fa;
  border-radius: 1.5em;
  padding: 1em;
  margin: 2em;
}

form div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input, select, textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
}

.error-message {
  color: red;
  margin-top: 1em;
}

.wallet-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
}

.wallet-card {
  background-color: #f8f9fa;
  border-radius: 1em;
  padding: 1em;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
}

.wallet-card h3 {
  margin: 0;
  font-size: 1.5em;
}

.wallet-card p {
  margin: 0.5em 0;
}
</style>