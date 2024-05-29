import cookie from "js-cookie";

export default async function getCourse(date: string) {  
  const response = 
  await fetch(`http://localhost:8000/course/list`,{
    method : "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${cookie.get('token')}` // JWT 토큰을 헤더에 추가
    },
    body: JSON.stringify({start_date:date+"-01", end_date: date+"-31"}),
  });

  return await response.json(); // 응답 본문을 JSON으로 파싱   
  
}
