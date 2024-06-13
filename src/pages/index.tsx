import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CalendarForm from "@/components/page/index/calendar-form";
import Statistic from "@/components/page/index/statistic";
import { useAuth } from "@/lib/auth/auth-provider";
import { Divider } from "antd";
import dayjs from "dayjs";
import cookie from "js-cookie";
import { useEffect, useRef, useState } from 'react';

const pageHeader: IPageHeader = {
  title: "아트히어로",
};

const IndexPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  const [choiceDate, setChoiceDate] = useState(new Date()); // 초기값은 현재 날짜
  const [classBooking, setClassBooking] = useState([
        { date: "", type: "", content: "" }
      ]);
  const memberNum = useRef(0);
  const plan = useRef(0);
  const done = useRef(0);
  const cancle = useRef(0);
  const paymentAmout = useRef(0);

  const getCourse = async(startDate:string, endDate:string) => {  
    setClassBooking([]);
    plan.current=0;
    done.current=0;
    cancle.current=0;
    paymentAmout.current=0;
    const queryString = `start_date=${startDate}&end_date=${endDate}`
    const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/list?${queryString}`,{
      method : "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${cookie.get('token')}` // JWT 토큰을 헤더에 추가
      }
    });

    const course = await response.json(); // 응답 본문을 JSON으로 파싱     
    const classBookingList: any[] = [];
    const memberChk: number[] = [];
    course.response.result?.forEach((item:any)=>{
      if(!memberChk.includes(item.members_id)){
        memberChk.push(item.members_id)
      }
      
      if(startDate <= item.payment_date && endDate >= item.payment_date ){
        paymentAmout.current += item.payment_amount;
      }
      
      item.class_booking?.forEach((data:any)=>{
        const toDate = data.reservation_date.split("T")[0];
        if(startDate <= toDate && endDate >= toDate){
          switch(data.enrollment_status){
            case "1": 
              plan.current++;
            break;
            case "2": 
              done.current++;
            break;
            case "3": 
              cancle.current++;
            break;
          }
          const BookinType = data.enrollment_status == "1" ? "warning" : (data.enrollment_status == "2" ? "success" : "error")
          classBookingList.push({date: data.reservation_date, type: BookinType, content: item.member.name});
        }
      });
    });

    memberNum.current = memberChk.length;
    setClassBooking(classBookingList)
  }

  useEffect(() => {
    const today = dayjs();
    // 현재 월의 첫 날
    const startDate = dayjs(today).startOf('month').format('YYYY-MM-DD');

    // 현재 월의 마지막 날
    const endDate = dayjs(today).endOf('month').format('YYYY-MM-DD');
    getCourse(startDate, endDate);
  }, []);

  return (
    <>
      <h2 className="title">👋 {session?.user.name || "관리자"}님 안녕하세요!</h2>
      <Statistic memberNum={memberNum.current} plan={plan.current} done={done.current} cancle={cancle.current} paymentAmout={paymentAmout.current}/>
      <Divider />

      <h3 className="title">달력</h3>

      <CalendarForm setSelDate={setChoiceDate} choiceDate={choiceDate} classBookingList={classBooking} getCourse={getCourse}/>
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
