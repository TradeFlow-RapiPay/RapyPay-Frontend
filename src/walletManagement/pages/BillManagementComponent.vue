<script>
import { BillApiService } from "@/walletManagement/services/bill-api.service.js";
import { WalletApiService } from "@/walletManagement/services/wallet-api.service.js";
import { BankApiService } from "@/bankManagement/services/bank-api.service.js";
import { Bill } from "@/walletManagement/model/bill.entity.js";
import { useAuthenticationStore } from "@/IAM/services/authentication.store.js";
import PdfTemplate from "@/walletManagement/components/pdf-template.vue";

export default {
  name: "BillManagementComponent",
  components: { PdfTemplate },
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
  computed: {
    currentUserId() {
      const authStore = useAuthenticationStore();
      return authStore.currentUserId; // Ensure this getter is correctly defined in the store
    }
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
        await this.walletApiService.calculate(this.walletId);
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
        const userId = this.currentUserId;
        const [emissionYear, emissionMonth, emissionDay] = this.newBill.emissionDate.split('-');
        const formattedEmissionDate = `${emissionDay}-${emissionMonth}-${emissionYear}`;

        const [dueYear, dueMonth, dueDay] = this.newBill.dueDate.split('-');
        const formattedDueDate = `${dueDay}-${dueMonth}-${dueYear}`;

        await this.billApiService.postBill(this.walletId, userId, {
          ...this.newBill,
          emissionDate: formattedEmissionDate,
          dueDate: formattedDueDate,
        });

        await this.fetchWalletDetails();
        await this.fetchBills();

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
    },
    async deleteWallet(walletId) {
      try {
        await this.walletApiService.deleteWallet(walletId);
        this.$router.push({ name: 'wallet-management' });
      } catch (error) {
        console.error("Error deleting wallet:", error);
        this.errorMessage = 'An error occurred while deleting the wallet.';
      }
    },
    async deleteBill(billId) {
      try {
        await this.billApiService.deleteBill(billId);
        this.bills = this.bills.filter(bill => bill.id !== billId);
      } catch (error) {
        console.error("Error deleting bill:", error);
        this.errorMessage = 'An error occurred while deleting the bill.';
      }
    }
  },
  exportToPDF() {
    this.$refs.pdfTemplate.generatePDF();
  }
};
</script>

<template>
  <div>
    <h1 v-if="walletDetails">Cartera {{ walletDetails.walletName }}</h1>
    <div  v-if="walletDetails" class="sub-titulo">
      <span>ID: {{ walletDetails.id }}</span>
    </div>
    <div class="div-bill-btn">
      <pv-button class="new-bill-btn" @click="toggleNewBillCard">+ Nueva Factura</pv-button>
    </div>
    <div class="parent-container">
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
            <label for="addressee">Destinatario:</label>
            <input v-model="newBill.addressee" id="addressee" required/>
          </div>
          <div>
            <label for="billType">Tipo de comprobante:</label>
            <select v-model="newBill.billType" id="billType" required>
              <option value="TYPE_BILL">Factura</option>
              <option value="TYPE_LETTER">Letra</option>
            </select>
          </div>
          <div>
            <label for="emissionDate">Fecha de emisión:</label>
            <input type="date" v-model="newBill.emissionDate" id="emissionDate" required/>
          </div>
          <div>
            <label for="dueDate">Fecha de vencimiento:</label>
            <input type="date" v-model="newBill.dueDate" id="dueDate" required/>
          </div>
          <pv-button class="btn-save" type="submit">Guardar</pv-button>
          <pv-button class="btn-cancel" type="button" @click="cancelCreation">Cancelar</pv-button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>

    </div>
    <div class="bill-cards">
      <div v-for="bill in bills" :key="bill.id" class="bill-card">
        <h3>{{ bill.billNumber }}</h3>
        <p>Tipo de factura: {{ bill.billType === 'TYPE_BILL' ? 'Factura' : bill.billType === 'TYPE_LETTER' ? 'Letra' : 'Unknown' }}</p>
        <p>Valor neto: {{ bill.netValue }}</p>
        <p>Descuento de factura: {{ bill.discount }}</p>
        <p>Destinatario: {{ bill.addressee }}</p>
        <p>Fecha de emisión: {{ bill.emissionDate }}</p>
        <p>Fecha de vencimiento: {{ bill.dueDate }}</p>
        <i class="pi pi-trash bill-trash" @click="deleteBill(bill.id)" style="  margin-left: 90%; font-size: 1.3rem;   color: #27AE60;"></i>
      </div>
    </div>
    <div v-if="walletDetails" class="wallet-details-card">
      <h2>Detalles Cartera</h2>
      <p>Cant. Facturas: {{ walletDetails.billsList ? walletDetails.billsList.length : 0 }}</p>
      <p>Tasa: {{ walletDetails.tea }}</p>
      <p>Porcentaje: {{ calculatePercentage(walletDetails) }}</p>
      <p>Fecha de cierre: {{ walletDetails.closingDate }}</p>
      <p>Banco: {{ walletDetails.bankName }}</p>
      <p>Descuento: {{ walletDetails.totalDiscount }}</p>
      <PdfTemplate ref="pdfTemplate" :wallet-details="walletDetails" :bills="bills"/>
      <pv-button class="btn-delete-wallet" @click="deleteWallet(walletDetails.id)">
        <i class="pi pi-trash wallet-trash" ></i>
        Borrar cartera
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
.new-bill-card {
  background-color: #f8f9fa;
  border-radius: 1em;
  padding: 1em;
  margin-top: 3em;
  width: 40%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.bill-trash:hover{
  color: #e74c3c !important;
  cursor: pointer;
}
.wallet-trash:hover {
  color: white;
  cursor: pointer;
}
.parent-container {
  display: flex;
  justify-content: center;
}
.div-bill-btn{
  display: flex;
  justify-content: left;
  margin-right: 2em;
}

h1 {
  text-align: center;
  font-size: 3em;
  margin-top: 2em;
}
.sub-titulo{
  align-items: center;
  text-align: center;
}

.btn-save, .new-bill-btn {
  background-color: #27AE60;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 1em;
}

.btn-cancel,.btn-delete-wallet {
  background-color: rgba(239, 82, 82, 0.65);
  border: none;
  border-radius: 2em;
  transition: background-color 0.3s;
}

.new-bill-btn:hover {
  background-color: #2cdc78;
  transform: translateY(-2px);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.btn-save:hover {
  background-color: #2cdc78;
  transform: translateY(-2px);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.btn-cancel:hover, .btn-delete-wallet:hover {
  background-color: firebrick !important;
  transform: translateY(-2px);
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.new-bill-btn {
  margin-left: auto;
}

.new-bill-card {
  background-color: #f8f9fa;
  border-radius: 1.5em;
  padding: 1em;
  margin: 3em;
}

form div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input, select{
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
  margin:2em;
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
  text-align: left;
  padding-left: 1em;
}

.wallet-details-card{
  margin: 2em ;
}
</style>