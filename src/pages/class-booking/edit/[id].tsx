import { useClassBooking } from "@/client/class-booking";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import ClassBookingForm from "@/components/page/class-booking/class-booking-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const PageHeader: IPageHeader = {
  title: "강의 예약 수정",
};

const ClassBookingEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const courseId = Number(router.query.id);
  const { data, error, isLoading } = useClassBooking({id:courseId});


  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading ) {
    return <Skeleton className="my-5" />;
  }

  return <ClassBookingForm id={router.query.id as string} initialValues={data} />;
};

ClassBookingEditPage.getLayout = getDefaultLayout;
ClassBookingEditPage.pageHeader = PageHeader;

export default ClassBookingEditPage;
