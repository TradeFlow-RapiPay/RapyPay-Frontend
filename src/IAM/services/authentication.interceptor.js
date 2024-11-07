import { useAuthenticationStore } from './authentication.store';
import Cookies from 'js-cookie';

export const authenticationInterceptor = (config) => {
    const authenticationStore = useAuthenticationStore();
    const isSignedIn = authenticationStore.isSignedIn;
    if (isSignedIn) {
        config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    }
    return config;
}