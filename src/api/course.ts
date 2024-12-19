import { useQuery } from "@tanstack/react-query";

export const useGetCoursesByBootcampId=(id:string)=>{
    return useQuery({queryKey:["bootcamp","courses",id],queryFn:async()=>{
     const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bootcamps/${id}/courses`, {
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

  export const useGetCoursesById=(id:string)=>{
    return useQuery({queryKey:["courses",id],queryFn:async()=>{
     const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`, {
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