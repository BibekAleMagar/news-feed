import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from"@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { useAuthAPi } from '@/hooks/authHook';
import type { LoginResponse } from '@/types/login/loginResponse';
import login from '../assets/login.svg'
import { useNavigate } from 'react-router-dom';


const formSchema = z.object({
    username: z.string().min(2, "At least two character is required"),
    password: z.string().min(5, "At least 5 character is required")
})
export const Login = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const {mutate, status} = useAuthAPi()
    const isLoading = status === "pending"
    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values, {
            onSuccess:(data: LoginResponse ) => {
                console.log(data),
                localStorage.setItem('token', data.accessToken)
                 const user = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    image: data.image,
                };
                localStorage.setItem("User", JSON.stringify(user))

                if(data.accessToken) {
                    navigate("/home")
                }                
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message
                console.error("Login failed", message );
                setErrorMessage(message)
            }
        })
    };
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    return(
        <>
            <div className='h-screen flex justify-center items-center bg-linear-to-b from-[#1A2A80] to-[#7A85C1] p-2'>
                <div className='bg-white shadow w-lg md:w-2xl lg:w-3xl flex justify-center md:h-[50%]'>
                    <div className='hidden md:block w-1/2 '>
                   
                    <img src={login} alt="" className='h-full w-full object-cover'/>
                    </div>
                    <div className='w-full md:w-1/2  p-5 flex flex-col justify-center'>
                    <p className='text-center text-2xl md:text-3xl font-bold mb-3'>Welcome Back!</p>
                    <p className='text-center text-2xl md:text-3xl font-bold mb-6'>Login to Your Account</p>
                    <Form {...form}>
                    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField 
                        control={form.control}
                        name= "username"
                        render= {({ field }) => (
                            <FormItem className='mb-3'>
                                <FormLabel className='text-xl'>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your name' {...field } className='text-xl' 
                                    
                                    onChange={(e) => {
                                        field.onChange(e)
                                        setErrorMessage(null)
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name= "password"
                        render= {({ field }) => (
                            <FormItem className='mb-3'> 
                                <FormLabel className='text-xl'>Password</FormLabel>
                                <FormControl>
                                    <div className='relative '>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className=''
                                            placeholder='Enter your password'
                                            {...field}
                                            onChange={(e) => {
                                        field.onChange(e)
                                        setErrorMessage(null)
                                        
                                    }} />
                                        <div className='absolute right-2 top-1' onClick={()=> setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff /> : <Eye /> }
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        {errorMessage && (
                            <p className='text-red-800 text-center'>{errorMessage}</p>
                        )}
                        <Button className='w-full text-lg cursor-pointer' type='submit' disabled={isLoading}>
                            {
                                isLoading ? (<>
                                    <p>Loggin In...</p>
                                    <Loader className='animate-spin ' />
                                </>) : "Log In"
                            }
                        </Button>
                </form>     
            </Form>
                    </div>
                </div>
            </div>
        </>
    )
}