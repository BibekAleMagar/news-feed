import type { LoginCredential } from '@/types/login/loginCredential';
import type {LoginResponse} from '../../types/login/loginResponse'
import axios from 'axios'

export const authApi = async (credential: LoginCredential): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_AUTH_URL}`, credential);
    return response.data
};