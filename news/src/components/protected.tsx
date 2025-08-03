import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const Protect = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    toast.error("You are not authenticated!", {
      duration: 3000,
      position: 'top-center'
    });
    return <Navigate to="/" replace />;
  }

  return children;
};