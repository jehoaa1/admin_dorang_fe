import cookie from "js-cookie";
import useSWR from "swr";


export interface Courses {
  id: number; 
  members_id: number;
  class_type: string;
  start_date:Date;
  end_date:Date;
  payment_amount:number;
  payment_date:Date;
  session_count:string;
  member:Members;
  class_booking: classBooking[];
}

interface Members {  
    id: number;
    name: string;
    phone: string;
    parent_phone: string;
    institution_name: number;
    birth_day: string;
}

interface classBooking {  
    id: number;
    reservation_date: Date;
    enrollment_status: string;
}

export interface CoursesParams {
  searchDatePeriod?: any;
  searchType?:string;
  searchText?:string;
  id?:number;
  name?: string;
  phone?: string;
  parent_phone?: string;
  class_type?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}

export interface CoursesResponse {
  result: string;
  result_msg: string;
  response: {result:Courses[], total_count:number};
}

export interface ICourses {
  members_id: number;
  class_type:string;
  start_date:Date;
  end_date:Date;
  session_count:number;
  payment_date:Date;
  payment_amount:number;
}
// export interface MemberAndCourses{
//   member: IMember;
//   courses: courses[];
// }

export const useCourses = (params: CoursesParams = {}) => {
  const { id, name, phone, parent_phone, class_type, start_date, end_date, page, per_page } = params;  
  
  const paramsList: CoursesParams = {
    id: id || undefined,
    name: name || undefined,
    phone: phone || undefined,
    parent_phone: parent_phone || undefined,
    class_type: class_type || undefined,
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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/course/list?${queryString}`;
  
  return useSWR<CoursesResponse>(
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

export const useCourseRemainSessionCount = (params: CoursesParams = {}) => {
  const { id, name, phone, parent_phone, class_type, start_date, end_date, page, per_page } = params;  
  
  const paramsList: CoursesParams = {
    id: id || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
  };

  const queryParams = Object.entries(paramsList)
    .filter(([key, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const queryString = queryParams.length > 0 ? `${queryParams}` : '';

  const token = cookie.get('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/course/remain/session-count/list?${queryString}`;
  
  return useSWR<CoursesResponse>(
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

export const getCourseRemainSessionCount = async(params: CoursesParams = {}) => {
  const { id, start_date, end_date } = params;  

  const paramsList: CoursesParams = {
    id: id || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
  };
  
  const queryParams = Object.entries(paramsList)
    .filter(([key, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const queryString = queryParams.length > 0 ? `${queryParams}` : '';

  const token = cookie.get('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/course/remain/session-count/list?${queryString}`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  
  return await res.json();
};


export const getCourses = async(params: CoursesParams = {}) => {
  const { name, phone, parent_phone, class_type, start_date, end_date, page, per_page } = params;  
  
  const paramsList: CoursesParams = {
    name: name || undefined,
    phone: phone || undefined,
    parent_phone: parent_phone || undefined,
    start_date: start_date || undefined,
    end_date: end_date || undefined,
    class_type: class_type || undefined,
    page: (page !== undefined ? page : 1),
    per_page: (per_page !== undefined ? per_page : 10),
  };

  const queryParams = Object.entries(paramsList)
    .filter(([key, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const queryString = queryParams.length > 0 ? `${queryParams}` : '';

  const token = cookie.get('token');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/course/list?${queryString}`;
  
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  
  return await res.json();
};

export const insCourses = async(param: ICourses ) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/register`,{
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

export const updCourses = async(id: number, param: ICourses ) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${id}`,{
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

export const delCourses = async(id: number) => {  
  const token = cookie.get('token');
  const response = 
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${id}`,{
    method : "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });

  const responseData = await response.json(); // 응답 본문을 JSON으로 파싱
  
  return responseData.result;
};
