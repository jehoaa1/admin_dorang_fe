import cookie from "js-cookie";
import useSWR from "swr";

export interface ClassBookingParams {
  searchDatePeriod?: any;
  searchType?:string;
  searchText?:string;
  id?:number;
  name?: string;
  enrollment_status?: string;
  class_type?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}

export interface ClassBooking {  
    id: number;
    reservation_date: Date;
    enrollment_status: string;
    course_id: number;
    course: Course;
    member: Member
}

interface Course {
  id: number; 
  class_type: string;
  start_date: Date;
  end_date: Date;
  payment_amount:number;
}

interface Member {  
    name: string;
    phone: string;
    parent_phone: string;
}

export interface ClassBookingResponse {
  result: string;
  result_msg: string;
  response: {result:ClassBooking[], total_count:number};
}

export interface IClassBooking {
  course_id: number;
  reservation_date: string;  
  enrollment_status:number;
}

export interface UClassBooking{
  reservation_date: string;  
  enrollment_status:number;
}

export const useClassBooking = (params: ClassBookingParams = {}) => {
  const { id, name, class_type, start_date, end_date, enrollment_status, page, per_page } = params;  
  
  const paramsList: ClassBookingParams = {
    id: id || undefined,
    name: name || undefined,
    class_type: class_type || undefined,
    enrollment_status: enrollment_status || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
    page: (page !== undefined ? page : 1),
    per_page: (per_page !== undefined ? per_page : 10),
  };

  const queryParams = Object.entries(paramsList)
    .filter(([key, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const queryString = queryParams.length > 0 ? `${queryParams}` : '';


  const token = cookie.get('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/class-booking/list?${queryString}`;
  
  return useSWR<ClassBookingResponse>(
    url,
    async () => {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });
      
      return await res.json();
    },
  );
};

export const getClassBooking = async(params: ClassBookingParams = {}) => {
  const { id, name, class_type, start_date, end_date, enrollment_status, page, per_page } = params;  
  
  const paramsList: ClassBookingParams = {
    id: id || undefined,
    name: name || undefined,
    class_type: class_type || undefined,
    enrollment_status: enrollment_status || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
    page: (page !== undefined ? page : 1),
    per_page: (per_page !== undefined ? per_page : 10),
  };

  const queryParams = Object.entries(paramsList)
    .filter(([key, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const queryString = queryParams.length > 0 ? `${queryParams}` : '';

  const token = cookie.get('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/class-booking/list?${queryString}`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  
  return await res.json();
};

export const insClassBooking = async(param: IClassBooking ) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class-booking/register`,{
    method : "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(param),
  });

  const responseData = await response.json(); // 응답 본문을 JSON으로 파싱
  
  return responseData.result;
};

export const updClassBooking = async(id: number, param: UClassBooking ) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class-booking/${id}`,{
    method : "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(param),
  });

  const responseData = await response.json(); // 응답 본문을 JSON으로 파싱
  
  return responseData.result;
};

export const delClassBooking = async(id: number) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/class-booking/${id}`,{
    method : "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });

  const responseData = await response.json(); // 응답 본문을 JSON으로 파싱
  
  return responseData.result;
};
