<script>
import {BankApiService} from "@/bankManagement/services/bank-api.service.js";
import {Bank} from "@/bankManagement/model/bank.entity.js";

export default {
  name: "bankManagementComponent",
  title:'Bank Management',
  data(){
    return {
      banks:[],
      bankApiService: new BankApiService()
    }
  },
  created(){
    this.fetchBanks();
  },
  methods:{
    async fetchBanks() {
      try {
        const response= await this.bankApiService.getAll();
        this.banks = response.data.map(bankData => new Bank(
            bankData.id,
            bankData.bankName,
            bankData.tea,
            bankData.tcea,
            bankData.additionalInfo));
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Compara Tasas</h1>
    <table class="p-datatable">
      <thead class="table-header">
      <tr>
        <th>Bancos</th>
        <th>TEA</th>
        <th>TCEA</th>
        <th>Información adicional</th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr v-for="bank in banks" :key="bank.id">
        <td>{{ bank.bankName }}</td>
        <td>{{ bank.tea }}</td>
        <td>{{ bank.tcea }}</td>
        <td>{{ bank.additionalInfo }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>
h1{
  text-align: center;
  font-size: 3em;
  margin-top: 2.5em;
}
.p-datatable {
  font-size: 20px;
  background-color: #f8f9fa;
  border-radius: 1.5em;
  padding: 1em;
  margin: 5em;
}
.table-header {
  padding: 2em;
}

.table-header th {
  padding: 10px;
  width: 10%;
  text-align: center;
}

.table-body td {
  width: 10%;
  padding: 10px 10px 10px 2em;
  text-align: left;
}


.table-body td:nth-child(2),
.table-body td:nth-child(3) {
  text-align: center;
}

@media (max-width: 768px) {
  .p-datatable {
    margin: 2em;
    font-size: 18px;
  }
  h1 {
    font-size: 2em;
  }
  .table-header th,
  .table-body td {
    padding: 5px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .p-datatable {
    margin: 1em;
    font-size: 16px;
  }
  h1 {
    font-size: 1.5em;
  }
  .table-header th,
  .table-body td {
    padding: 3px;
    font-size: 14px;
  }
}
</style>