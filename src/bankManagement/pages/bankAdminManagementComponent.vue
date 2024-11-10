<script>
import { BankApiService } from "@/bankManagement/services/bank-api.service.js";
import { Bank } from "@/bankManagement/model/bank.entity.js";

export default {
  name: "BankAdminManagementComponent",
  data() {
    return {
      banks: [],
      selectedBank: null,
      newBank: new Bank(),
      bankApiService: new BankApiService(),
      displayDialog: false,
    };
  },
  created() {
    this.fetchBanks();
  },
  methods: {
    async fetchBanks() {
      try {
        const response = await this.bankApiService.getAll();
        this.banks = response.data.map(
            (bankData) =>
                new Bank(
                    bankData.id,
                    bankData.bankName,
                    bankData.tea,
                    bankData.tcea,
                    bankData.additionalInfo
                )
        );
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    },
    showDialog(bank) {
      if (bank) {
        this.selectedBank = {...bank};
      } else {
        this.selectedBank = new Bank();
      }
      this.displayDialog = true;
    },
    async addBank() {
      try {
        await this.bankApiService.newBank(this.selectedBank);
        await this.fetchBanks();
        this.selectedBank = new Bank();
        this.displayDialog = false;
      } catch (error) {
        console.error("Error adding bank:", error);
      }
    },
    async updateBank() {
      try {
        await this.bankApiService.updateBank(this.selectedBank.id, this.selectedBank);
        await this.fetchBanks();
        this.selectedBank = null;
        this.displayDialog = false;
      } catch (error) {
        console.error("Error updating bank:", error);
      }
    },
    async deleteBank(bankId) {
      try {
        await this.bankApiService.deleteBank(bankId);
        await this.fetchBanks();
        this.$refs.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bank deleted successfully',
          life: 3000
        });
      } catch (error) {
        console.error("Error deleting bank:", error);
      }
    }
  },
};
</script>
<template>
  <div>
    <h1>Gestión de bancos</h1>
    <pv-button class="btn-new-bank" label="Agregar Banco" icon="pi pi-plus" @click="showDialog(null)"/>
    <pv-data-table class="bank-table" :value="banks" selection-mode="single">
      <pv-column field="bankName" header="Nombre"></pv-column>
      <pv-column field="tea" header="TEA"></pv-column>
      <pv-column field="tcea" header="TCEA"></pv-column>
      <pv-column field="additionalInfo" header="Información adicional"></pv-column>
      <pv-column header="Actions">
        <template #body="slotProps">
          <pv-button icon="pi pi-pencil" @click="showDialog(slotProps.data)"/>
          <pv-button class="delete-button"
                     style="background-color: indianred; border:none; margin-left: 0.3rem"
                     icon="pi pi-trash"
                     @click="deleteBank(slotProps.data.id)"/>
        </template>
      </pv-column>
    </pv-data-table>

    <pv-dialog :visible="displayDialog" @hide="displayDialog = false">
      <template #header>
        <h2>{{ selectedBank && selectedBank.id ? 'Edit Bank' : 'Add Bank' }}</h2>
      </template>
      <template #footer>
        <pv-button label="Cancel" icon="pi pi-times" @click="displayDialog = false"/>
        <pv-button label="Save" icon="pi pi-check" @click="selectedBank.id ? updateBank() : addBank()"/>
      </template>
      <div class="bank-forms">
        <pv-input-text v-model="selectedBank.bankName" placeholder="Nombre"/>
        <pv-input-number v-model.number="selectedBank.tea" mode="decimal" placeholder="TEA" :minFractionDigits="2" fluid />
        <pv-input-number v-model.number="selectedBank.tcea" mode="decimal" placeholder="TCEA"  :minFractionDigits="2" fluid />
        <pv-input-text v-model="selectedBank.additionalInfo" placeholder="Información adicional"/>
      </div>
    </pv-dialog>
    <pv-confirm-popup ref="confirmPopup"></pv-confirm-popup>
    <pv-toast ref="toast"></pv-toast>
  </div>
</template>

<style scoped>
.delete-button:hover {
  background-color: darkred;
}
h1 {
  text-align: center;
  margin-bottom: 1em;
}

.bank-forms {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.btn-new-bank {
  margin-left: 2em;
  color: #fff;
  border-radius: 2em;
  padding: 10px 20px;
}

.bank-table {
  margin: 1.5em;
}
</style>