<script>
import { BillApiService } from "@/walletManagement/services/bill-api.service.js";
import { WalletApiService } from "@/walletManagement/services/wallet-api.service.js";
import { BankApiService } from "@/bankManagement/services/bank-api.service.js";
import { Bill } from "@/walletManagement/model/bill.entity.js";

export default {
  name: "BillManagementComponent",
  data() {
    return {
      walletId: this.$route.params.walletId,
      bills: [],
      walletDetails: null,
      newBill: new Bill(),
      billApiService: new BillApiService(),
      walletApiService: new WalletApiService(),
      bankApiService: new BankApiService(),
      showNewBillCard: false,
      errorMessage: ''
    };
  },
  created() {
    this.fetchBills();
    this.fetchWalletDetails();
  },
  methods: {
    async fetchBills() {
      try {
        const response = await this.billApiService.getBillsByWalletId(this.walletId);
        this.bills = response.data;
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    },
    async fetchWalletDetails() {
      try {
        const walletResponse = await this.walletApiService.getWalletById(this.walletId);
        const wallet = walletResponse.data;

        const bankResponse = await this.bankApiService.getBankById(wallet.bank);
        const bank = bankResponse.data;

        this.walletDetails = {
          ...wallet,
          bankName: bank ? bank.bankName : "Unknown Bank",
          tea: bank ? bank.tea : 0
        };
      } catch (error) {
        console.error("Error fetching wallet details:", error);
        this.errorMessage = 'Error fetching wallet details';
      }
    },
    toggleNewBillCard() {
      this.showNewBillCard = !this.showNewBillCard;
    },
    async createBill() {
      try {
        this.newBill.walletId = this.walletId;

        // Transformar las fechas al formato DD-MM-YYYY
        const [emissionYear, emissionMonth, emissionDay] = this.newBill.emissionDate.split('-');
        const formattedEmissionDate = `${emissionDay}-${emissionMonth}-${emissionYear}`;

        const [dueYear, dueMonth, dueDay] = this.newBill.dueDate.split('-');
        const formattedDueDate = `${dueDay}-${dueMonth}-${dueYear}`;

        const response = await this.billApiService.postBill(this.walletId, {
          ...this.newBill,
          emissionDate: formattedEmissionDate,
          dueDate: formattedDueDate
        });

        this.bills.push(response.data);
        this.newBill = new Bill();
        this.showNewBillCard = false;
        this.errorMessage = '';
      } catch (error) {
        console.error("Error creating bill:", error);
        this.errorMessage = 'An error occurred while creating the bill.';
      }
    },
    cancelCreation() {
      this.newBill = new Bill();
      this.showNewBillCard = false;
      this.errorMessage = '';
    },
    calculatePercentage(wallet) {
      return (wallet.totalDiscount / wallet.totalNetValue) * 100;
    }
  }
};
</script>

<template>
  <div>
    <h1>Facturas de la Cartera</h1>
    <button @click="toggleNewBillCard">+ Nueva Factura</button>
    <div v-if="showNewBillCard" class="new-bill-card">
      <h2>Registrar nueva factura</h2>
      <form @submit.prevent="createBill">
        <div>
          <label for="billNumber">Número de factura:</label>
          <input v-model="newBill.billNumber" id="billNumber" required/>
        </div>
        <div>
          <label for="netValue">Valor neto:</label>
          <input v-model="newBill.netValue" id="netValue" required/>
        </div>
        <div>
          <label for="emissionDate">Fecha de emisión:</label>
          <input type="date" v-model="newBill.emissionDate" id="emissionDate" required/>
        </div>
        <div>
          <label for="dueDate">Fecha de vencimiento:</label>
          <input type="date" v-model="newBill.dueDate" id="dueDate" required/>
        </div>
        <button type="submit">Guardar</button>
        <button type="button" @click="cancelCreation">Cancelar</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <div class="bill-cards">
      <div v-for="bill in bills" :key="bill.id" class="bill-card">
        <h3>{{ bill.billNumber }}</h3>
        <p>Valor neto: {{ bill.netValue }}</p>
        <p>Fecha de emisión: {{ bill.emissionDate }}</p>
        <p>Fecha de vencimiento: {{ bill.dueDate }}</p>
      </div>
    </div>
    <div v-if="walletDetails" class="wallet-details-card">
      <h2>Detalles Cartera</h2>
      <p>Nombre: {{ walletDetails.walletName }}</p>
      <p>ID: {{ walletDetails.id }}</p>
      <p>Cant. Facturas: {{ walletDetails.billsList ? walletDetails.billsList.length : 0 }}</p>
      <p>Tasa: {{ walletDetails.tea }}</p>
      <p>Porcentaje: {{ calculatePercentage(walletDetails) }}</p>
      <p>Fecha de cierre: {{ walletDetails.closingDate }}</p>
      <p>Banco: {{ walletDetails.bankName }}</p>
      <p>Descuento: {{ walletDetails.totalDiscount }}</p>
    </div>
  </div>
</template>

<style scoped>
.wallet-details-card {
  background-color: #f8f9fa;
  border-radius: 1em;
  padding: 1em;
  margin-top: 2em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

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

.new-bill-card {
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

input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
}

.error-message {
  color: red;
  margin-top: 1em;
}

.bill-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
}

.bill-card {
  background-color: #f8f9fa;
  border-radius: 1em;
  padding: 1em;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.bill-card h3 {
  margin: 0;
  font-size: 1.5em;
}

.bill-card p {
  margin: 0.5em 0;
}
</style>