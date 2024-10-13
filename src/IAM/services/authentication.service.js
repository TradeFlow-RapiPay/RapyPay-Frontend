import http from "@/shared/services/http-common.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return http.post('/user/signin', signInRequest);
    }
    signUp(signUpRequest) {
        return http.post('/user/signup', signUpRequest);
    }
}