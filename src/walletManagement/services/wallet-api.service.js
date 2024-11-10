import http from "@/shared/services/http-common.js";
import Cookies from "js-cookie";

export class WalletApiService {
    postWallet(id, walletData) {
        return http.post(`/wallet/insert/${id}`, walletData, { headers: this.getAuthHeaders() });
    }
    updateWallet(id, walletData) {
        return http.put(`/wallet/update/${id}`, walletData, { headers: this.getAuthHeaders() });
    }
    deleteWallet(id) {
        return http.delete(`/wallet/delete/${id}`, { headers: this.getAuthHeaders() });
    }
    calculate(id) {
        return http.put(`/wallet/calculate/${id}`, null, { headers: this.getAuthHeaders() });
    }

    getAllWallet() {
        return http.get('/wallet/findAll', { headers: this.getAuthHeaders() });
    }
    getWalletById(id) {
        return http.get(`/wallet/${id}`, { headers: this.getAuthHeaders() });
    }
    getWalletByUserId(userId) {
        return http.get(`/wallet/user/${userId}`, { headers: this.getAuthHeaders() });
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