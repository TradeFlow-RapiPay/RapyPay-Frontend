import { createRouter, createWebHistory } from "vue-router";
import walletManagementComponent from "@/walletManagement/pages/walletManagementComponent.vue";
import bankManagementComponent from "@/bankManagement/pages/bankManagementComponent.vue";
import BillManagementComponent from "@/walletManagement/pages/BillManagementComponent.vue";
import PageNotFoundComponent from "@/public/pages/pageNotFoundComponent.vue";
import SignInComponent from "@/IAM/pages/sign-in.component.vue";
import SignUpComponent from "@/IAM/pages/sign-up.component.vue";
import { authenticationGuard } from "@/IAM/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/my-wallets', name: 'my-wallets', component: walletManagementComponent, meta: { title: 'Wallet Management' } },
        { path: '/banks', name: 'banks', component: bankManagementComponent, meta: { title: 'Bank Management' } },
        { path: '/wallets/:walletId/bills', name: 'bill-management', component: BillManagementComponent, meta: { title: 'Bill Management' } },
        { path: '/wallet-management', name: 'wallet-management', component: walletManagementComponent, meta: { title: 'Wallet Management' } },
        { path: '/', redirect: '/my-wallets' },
        { path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: { title: 'Sign In' } },
        { path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: { title: 'Sign Up' } },
        { path: '/:pathMatch(.*)*', component: PageNotFoundComponent },
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'RapiPay';
    document.title = `${baseTitle} | ${to.meta["title"]}`;
    authenticationGuard(to, from, next);
});

export default router;