import http from "@/walletManagement/services/services/http-common.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return http.post('/authentication/sign-in/', signInRequest);
    }
    signUp(signUpRequest) {
        return http.post('/authentication/sign-up/', signUpRequest);
    }
}