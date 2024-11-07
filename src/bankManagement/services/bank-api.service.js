import http from "@/shared/services/http-common.js";
import Cookies from "js-cookie";

export class BankApiService {
    getAuthHeaders() {
        const token = Cookies.get('token');
        if (!token) {
            console.warn("No auth token found, redirecting to login");
            window.location.href = '/sign-up';
            return {};
        }
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