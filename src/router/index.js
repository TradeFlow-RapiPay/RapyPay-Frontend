import {createRouter, createWebHistory} from "vue-router";
import walletManagementComponent from "@/walletManagement/pages/walletManagementComponent.vue";
import bankManagementComponent from "@/bankManagement/pages/bankManagementComponent.vue";
import PageNotFoundComponent from "@/public/pages/pageNotFoundComponent.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/my-wallets', component:walletManagementComponent, meta:{title:'Wallet Management'},},
        { path: '/banks', component:bankManagementComponent, meta:{title:'Bank Management'},},
        { path: '/',  redirect: '/my-wallets' },
        { path: '/:pathMatch(.*)*', component: PageNotFoundComponent},
    ]
});
/*router.beforeEach((to, from, next) => {
    let baseTitle = 'RapiPay';
    document.title = `${ baseTitle } | ${to.meta["title"]}`;
    authenticationGuard(to, from, next);
});*/


export default router;
