import http from "@/shared/services/http-common.js";

export class BankApiService {
    getBankById(id) {
        return http.get(`/bank/${id}`, { headers: this.getAuthHeaders() });
    }

    getAll() {
        return http.get('/bank/findAll', { headers: this.getAuthHeaders() });
    }

    getAuthHeaders() {
        const token = localStorage.getItem('authToken'); // Adjust this line based on how you store the token
        return { Authorization: `Bearer ${token}` };
    }
}