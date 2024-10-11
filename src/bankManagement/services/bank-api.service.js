import http from "@/shared/services/http-common.js";

export class BankApiService {
    getAll() {
        return http.get('/bancos');
    }
}