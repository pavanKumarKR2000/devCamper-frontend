import { useQuery } from "@tanstack/react-query";

export const useGetBootcamps=()=>{
    return useQuery({queryKey:["bootcamps"],queryFn:async()=>{
     const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps`, {
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