import http from "@/shared/services/http-common.js";

export class BankApiService {
    getAuthHeaders() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }

    getBankById(id) {
        return http.get(`/bank/${id}`, { headers: this.getAuthHeaders() });
    }

    getAll() {
        return http.get('/bank/findAll', { headers: this.getAuthHeaders() });
    }

    newBank(bank) {
        return http.post('/bank/insert', bank, { headers: this.getAuthHeaders() });
    }

    updateBank(id, bank) {
        return http.put(`/bank/update/${id}`, bank, { headers: this.getAuthHeaders() });
    }

    deleteBank(id) {
        return http.delete(`/bank/delete/${id}`, { headers: this.getAuthHeaders() });
    }
}