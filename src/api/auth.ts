import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useRegistration=()=>{
    return useMutation({mutationFn:async(body:any)=>{
     const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || errorResponse.error || 'Something went wrong');
      }
    
      return res.json();
      
    }})
}

export const useLogin=()=>{
    return useMutation({mutationFn:async(body:any)=>{
     const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message ||errorResponse.error|| 'Something went wrong');
      }
    
      return res.json();
      
    }})
}

export const useLogout=()=>{
    return useMutation({mutationFn:async()=>{
     const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message ||errorResponse.error|| 'Something went wrong');
      }
    
      return res.json();
      
    }})
}

export const useGetMe=()=>{
  return useQuery({queryKey:["me"],queryFn:async()=>{
    return getMe(); 
  }})
}

export const getMe=async(authToken?:string)=>{
  const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
    ...(authToken?{headers: {
      Authorization: `Bearer ${authToken}`,
    }}:{}),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message ||errorResponse.error|| 'Something went wrong');
  }

  return res.json();
 
}



