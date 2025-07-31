import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
            localStorage.clear();
            navigate("/")
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="flex cursor-pointer bg-black text-white p-1 px-2 rounded font-bold">Log Out <LogOut className="ml-2" /></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will log you out from the website
                                </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">No</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogOut} className="cursor-pointer">Yes</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </>
    )
}