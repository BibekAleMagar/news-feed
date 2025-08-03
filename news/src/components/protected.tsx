import { useEffect, type JSX } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export const Protect = ( {children }: { children: JSX.Element }) => {
        const navigate = useNavigate()
        const token: string | null = localStorage.getItem('token');
        useEffect(() => {
            if(!token) {
                toast.error("You are not authenticated!")
                setTimeout(() => {
                    navigate('/')
                },2000)
            }
        }, [token,navigate])
        if(!token) {
            return null
        }
   return children;
}