import type { LoginResponse } from "@/types/login/loginResponse";
import { authApi } from "@/api/mutation/authApi";
import { useMutation } from "@tanstack/react-query";
import type { LoginCredential } from "@/types/login/loginCredential";

export const useAuthAPi = () => {
    return useMutation<LoginResponse, Error, LoginCredential>({
        mutationFn: authApi,
    })
}