import { defineStore } from "pinia";
import { AuthenticationService } from "./authentication.service.js";
import { SignInResponse } from "../model/sign-in.response.js";
import { SignUpResponse } from "../model/sign-up.response.js";
import Cookies from 'js-cookie';

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({
        signedIn: !!Cookies.get('token'),
        userId: Cookies.get('userId') || 0,
        username: Cookies.get('username') || '',
        role: Cookies.get('role') || '',
        currentUserId: null,
    }),
    getters: {
        isSignedIn: (state) => state.signedIn,
        currentUserId: (state) => state.userId,
        currentUsername: (state) => state.username,
        currentRole: (state) => state.role,
        currentToken: () => Cookies.get('token')
    },
    actions: {
        setCurrentUserId(userId) {
            this.currentUserId = userId;
        },
        async signIn(signInRequest, router, toast) {
            try {
                const response = await authenticationService.signIn(signInRequest);
                const signInResponse = new SignInResponse(response.data.userId, response.data.username, response.data.role, response.data.token);
                this.signedIn = true;
                this.userId = signInResponse.userId;
                this.username = signInResponse.username;
                this.role = signInResponse.role;
                Cookies.set('token', signInResponse.token);
                Cookies.set('userId', signInResponse.userId);
                Cookies.set('username', signInResponse.username);
                Cookies.set('role', signInResponse.role);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Log in successful', life: 3000 });

                if (signInResponse.role === 'ROLE_USER') {
                    router.push({ name: 'my-wallets' });
                } else {
                    router.push({ name: 'bank-admin-management' });
                }
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'User or password incorrect', life: 3000 });
                router.push({ name: 'sign-in' });
            }
        },
        async signUp(signUpRequest, router, toast) {
            try {
                const response = await authenticationService.signUp(signUpRequest);
                const signUpResponse = new SignUpResponse(response.data.message);
                router.push({ name: 'sign-in' });
                toast.add({ severity: 'success', summary: 'Success', detail: 'User Created Successfully', life: 3000 });
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'User already exists', life: 3000 });
                router.push({ name: 'sign-up' });
            }
        },
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            this.role = '';
            Cookies.remove('token');
            Cookies.remove('userId');
            Cookies.remove('username');
            Cookies.remove('role');
            await router.push({ name: 'sign-in' });
        }
    }
});