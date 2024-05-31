import { ClassBookingParams, delClassBooking, getClassBooking, useClassBooking } from "@/client/class-booking";
import { IDefaultLayoutPage, IPageHeader, getDefaultLayout } from "@/components/layout/default-layout";
import ClassBookingList from "@/components/page/class-booking/class-booking-list";
import ClassBookingSearch from "@/components/page/class-booking/class-booking-search";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from "next/router";
import { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

const pageHeader: IPageHeader = {
  title: "강의 예약",
};

const ClassBookingListPage: IDefaultLayoutPage = () => {    
  const router = useRouter();
  const { data, error, isLoading } = useClassBooking({ page: router.query.page ? Number(router.query.page) : 1 });  
  const [dataC, setDataC] = useState(data);
  
  const refunc = async(params: ClassBookingParams = {}) => {
    const startDate = params.searchDatePeriod?.[0] ? dayjs(params.searchDatePeriod[0]).tz("Asia/Seoul").format("YYYY-MM-DD") : null;
    const endDate = params.searchDatePeriod?.[1] ? dayjs(params.searchDatePeriod[1]).tz("Asia/Seoul").format("YYYY-MM-DD") : null;
    const name = params.searchType == 'name' && params.searchText;
    try {
      const result = await getClassBooking({
        id: params.id || undefined,
        name: name || undefined,
        class_type: params.class_type,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        enrollment_status: params.enrollment_status || undefined,
        page: router.query.page ? Number(router.query.page) : 1
      });

      setDataC(result);
    } catch (error) {
      console.error("Error fetching class-booking:", error);
    }
  };


  return (
    <>
      <ClassBookingSearch handleFinish={refunc} />
      <ClassBookingList data={(dataC || data) || { result: "", result_msg: "", response: {result: [],total_count:0} }} delClassBooking={delClassBooking} />
    </>
  );
};

ClassBookingListPage.getLayout = getDefaultLayout;
ClassBookingListPage.pageHeader = pageHeader;

export default ClassBookingListPage;
