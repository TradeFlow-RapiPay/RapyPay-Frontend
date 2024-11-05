import { createApp } from 'vue'
import { createPinia } from 'pinia'
// PrimeVue
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';


// PrimeVue Material Design Theme
import router from "@/router/index.js";
import Nora from '@primevue/themes/aura';

import App from './app.vue'

import ToastService from 'primevue/toastservice';
import ConfirmationService from "primevue/confirmationservice";
import '@fortawesome/fontawesome-free/css/all.css'
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Password from "primevue/password";
import Card from "primevue/card";
import ConfirmPopup from "primevue/confirmpopup";
import InputNumber from "primevue/inputnumber";
import Menubar from "primevue/menubar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Sidebar from "primevue/sidebar";
import SelectButton from "primevue/selectbutton";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Select from "primevue/select";


createApp(App)
    .use(PrimeVue,
        {
            theme:
                {
                    preset: Nora,
                    options: {
                        darkModeSelector: false
                    }
                },
        ripple : true})
    .use(router)
    .use(createPinia())
    .use(ConfirmationService)
    .use(ToastService)
    .component('pv-input-text', InputText)
    .component('pv-float-label', FloatLabel)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-button', Button)
    .component('pv-password', Password)
    .component('pv-card', Card)
    .component('pv-confirm-popup',ConfirmPopup)
    .component('pv-input-number', InputNumber)
    .component('pv-menubar',Menubar)
    .component('pv-data-table',DataTable)
    .component('pv-column',Column)
    .component('pv-sidebar',Sidebar)
    .component('pv-select-button', SelectButton)
    .component('pv-divider',Divider)
    .component('pv-dropdown',Dropdown)
    .component('pv-calendar',Calendar)
    .component('pv-dialog',Dialog)
    .component('pv-toast', Toast)
    .component('pv-select', Select)
    .mount('#app')

export default App;