import http from "@/shared/services/http-common.js";

export class BillApiService {
    getAllBills() {
        return http.get('/bill/findAll', { headers: this.getAuthHeaders() });
    }

    getBillById(id) {
        return http.get(`/bill/${id}`, { headers: this.getAuthHeaders() });
    }

    postBill(walletId, billData) {
        return http.post(`/bill/insert/${walletId}`, billData, { headers: this.getAuthHeaders() });
    }

    updateBill(id, billData) {
        return http.put(`/bill/update/${id}`, billData, { headers: this.getAuthHeaders() });
    }

    deleteBill(id) {
        return http.delete(`/bill/delete/${id}`, { headers: this.getAuthHeaders() });
    }

    getBillsByWalletId(walletId) {
        return http.get(`/bill/wallet/${walletId}`, { headers: this.getAuthHeaders() });
    }

    getAuthHeaders() {
        const token = localStorage.getItem('authToken'); // Adjust this line based on how you store the token
        return { Authorization: `Bearer ${token}` };
    }
}