import { defineStore } from "pinia";
import { AuthenticationService } from "./authentication.service.js";
import { SignInResponse } from "../model/sign-in.response.js";
import { SignUpResponse } from "../model/sign-up.response.js";

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({ signedIn: false, userId: 0, userName: '' }),
    getters: {
        isSignedIn: (state) => state["signedIn"],
        currentUserId: state => state["userId"],
        currentUsername: state => state["username"],
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        async signIn(signInRequest, router) {
            try {
                const response = await authenticationService.signIn(signInRequest);
                let signInResponse = new SignInResponse(response.data.userId, response.data.username, response.data.token);
                console.log(signInResponse);
                this.signedIn = true;
                this.userId = signInResponse.userId;
                this.username = signInResponse.username;
                localStorage.setItem('token', signInResponse.token);
                router.push({ name: 'my-wallets' });
            } catch (error) {
                router.push({ name: 'sign-in' });
            }
        },
        async signUp(signUpRequest, router, toast) {
            try {
                const response = await authenticationService.signUp(signUpRequest);
                let signUpResponse = new SignUpResponse(response.data.message);
                console.log(signUpResponse.message);
                router.push({ name: 'sign-in' });
                toast.add({severity: "success", summary: "Success", detail: 'User Created Successfully', life: 3000,});
                console.log(signUpResponse);
            } catch (error) {
                console.error(error);
                toast.add({ severity: 'error', summary: 'Error', detail: 'User already exists' , life: 3000,});
                router.push({ name: 'sign-up' });
            }
        },
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            localStorage.removeItem('token');
            console.log('Signed out');
            await router.push({ name: 'sign-in' });
        }
    }
});