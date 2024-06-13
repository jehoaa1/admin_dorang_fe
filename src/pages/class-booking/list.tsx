import { ClassBookingParams, delClassBooking, getClassBooking, useClassBooking } from "@/client/class-booking";
import { IDefaultLayoutPage, IPageHeader, getDefaultLayout } from "@/components/layout/default-layout";
import ClassBookingList from "@/components/page/class-booking/class-booking-list";
import ClassBookingSearch from "@/components/page/class-booking/class-booking-search";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

const pageHeader: IPageHeader = {
  title: "강의 예약",
};

const ClassBookingListPage: IDefaultLayoutPage = () => {    
  const router = useRouter();
  const { data: initialData, error, mutate } = useClassBooking({ page: router.query.page ? Number(router.query.page) : 1 });
  const [searchParams, setSearchParams] = useState<ClassBookingParams>({});
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const startDate = searchParams.searchDatePeriod?.[0] ? dayjs(searchParams.searchDatePeriod[0]).tz("Asia/Seoul").format("YYYY-MM-DD") : null;
      const endDate = searchParams.searchDatePeriod?.[1] ? dayjs(searchParams.searchDatePeriod[1]).tz("Asia/Seoul").format("YYYY-MM-DD") : null;
      const name = searchParams.searchType === 'name' && searchParams.searchText;

      try {
        const result = await getClassBooking({
          id: searchParams.id || undefined,
          name: name || undefined,
          class_type: searchParams.class_type,
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          enrollment_status: searchParams.enrollment_status || undefined,
          page: router.query.page ? Number(router.query.page) : 1
        });

        setData(result);
      } catch (error) {
        console.error("Error fetching class-booking:", error);
      }
    };

    fetchData();
  }, [searchParams, router.query.page]);


  const handleSearch = (params: ClassBookingParams) => {
    setSearchParams(params);
  };

  return (
    <>
      <ClassBookingSearch handleFinish={handleSearch} />
      <ClassBookingList data={data || { result: "", result_msg: "", response: {result: [], total_count: 0} }} delClassBooking={delClassBooking} />
    </>
  );
};

ClassBookingListPage.getLayout = getDefaultLayout;
ClassBookingListPage.pageHeader = pageHeader;

export default ClassBookingListPage;
