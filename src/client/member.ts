import cookie from "js-cookie";
import useSWR from "swr";

export interface Members {
  courses: courses[],
  member: {
    id: number;
    name: string;
    phone: string;
    parent_phone: string;
    institution_name: number;
    birth_day: string;
  }
}

export interface MembersParams {
  searchDatePeriod?: any;
  searchType?:string;
  searchText?:string;
  id?:number;
  name?: string;
  phone?: string;
  parent_phone?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}

export interface MembersResponse {
  result?: string;
  result_msg?: string;
  response?: any;
}

interface IMember {
  birth_day: string;
  institution_name:string;
  name:string;
  parent_phone:string;
  phone:string;
}

export interface courses {
  id?: number; 
  class_type: string;
  start_date:Date;
  end_date:Date;
  payment_amount:number;
  session_count:string;
}

export interface MemberAndCourses{
  member: IMember;
  courses: courses[];
}

export const useMembers = (params: MembersParams = {}) => {
  const { id, name, phone, parent_phone, start_date, end_date, page, per_page } = params;  
  
  const paramsList: MembersParams = {
    id: id || undefined,
    name: name || undefined,
    phone: phone || undefined,
    parent_phone: parent_phone || undefined,
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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/members/list?${queryString}`;
  
  return useSWR<MembersResponse>(
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

export const getMembers = async(params: MembersParams = {}) => {
  const { name, phone, parent_phone, start_date, end_date, page, per_page } = params;  
  
  const paramsList: MembersParams = {
    name: name || undefined,
    phone: phone || undefined,
    parent_phone: parent_phone || undefined,
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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/members/list?${queryString}`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  
  return await res.json();
};

export const insMembers = async(param: IMember ) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/register`,{
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

export const updMembers = async(id: number, param: IMember ) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,{
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

export const delMembers = async(id: number) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,{
    method : "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });

  const responseData = await response.json(); // 응답 본문을 JSON으로 파싱
  
  return responseData.result;
};
