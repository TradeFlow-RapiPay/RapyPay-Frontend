import http from "@/shared/services/http-common.js";
import Cookies from "js-cookie";

export class BillApiService {
    getAllBills() {
        return http.get('/bill/findAll', { headers: this.getAuthHeaders() });
    }

    getBillById(id) {
        return http.get(`/bill/${id}`, { headers: this.getAuthHeaders() });
    }

    postBill(walletId, userId, billData) {
        return http.post(`/bill/insert/${walletId}/${userId}`, billData, { headers: this.getAuthHeaders() });
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
        const token = Cookies.get('token');
        if (!token) {
            console.warn("No auth token found, redirecting to login");
            window.location.href = '/sign-up';
            return {};
        }
        return { Authorization: `Bearer ${token}` };
    }
}