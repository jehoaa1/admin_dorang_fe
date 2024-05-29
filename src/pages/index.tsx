import { useDashboard } from "@/client/sample/dashboard";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CalendarForm from "@/components/page/index/calendar-form";
import Statistic from "@/components/page/index/statistic";
import { useAuth } from "@/lib/auth/auth-provider";
import { Alert, Divider, Skeleton } from "antd";
import { useEffect, useState } from 'react';

const pageHeader: IPageHeader = {
  title: "아트히어로",
};

const IndexPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  const { data, error } = useDashboard();
  const [choiceDate, setChoiceDate] = useState(new Date()); // 초기값은 현재 날짜
  const [classBooking, setClassBoking] = useState([]);

  useEffect(() => {
    console.log("===",choiceDate);
  }, [choiceDate]);

  return (
    <>
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>

      <div className="my-5">
        {data ? (
          <Statistic/>
        ) : error ? (
          <Alert message="대시보드 API 호출 중 오류가 발생했습니다." type="warning" />
        ) : (
          <Skeleton />
        )}
      </div>

      <Divider />

      <h3 className="title">달력</h3>

      <CalendarForm selDate={choiceDate} setSelDate={setChoiceDate} classBookingList={classBooking}/>
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
