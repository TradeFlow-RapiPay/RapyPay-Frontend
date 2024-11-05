import http from "@/shared/services/http-common.js";

export class WalletApiService {

    //puede recivir nulo, como la lista de bill y closingDate, totalDiscount, totalNetValue
    postWallet(id, walletData) {
        return http.post(`/wallet/insert/${id}`, walletData, { headers: this.getAuthHeaders() });
    }
    updateWallet(id, walletData) {
        return http.put(`/wallet/update/${id}`, walletData);
    }
    deleteWallet(id) {
        return http.delete(`/wallet/delete/${id}`);
    }
    calculate(id) {
        return http.put(`/wallet/calculate/${id}`, null, { headers: this.getAuthHeaders() });
    }

    getAuthHeaders() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }
    getAllWallet(){
        return http.get('/wallet/findAll');
    }
    getWalletById(id){
        return http.get(`/wallet/${id}`);
    }
    getWalletByUserId(userId){
        return http.get(`/wallet/user/${userId}`);
    }
}