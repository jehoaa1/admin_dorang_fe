import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CourseForm from "@/components/page/class-booking/class-booking-form";

const pageHeader: IPageHeader = {
  title: "강의 예약",
};

const CourseNewPage: IDefaultLayoutPage = () => {
  return <CourseForm initialValues={{}} />;
};

CourseNewPage.getLayout = getDefaultLayout;
CourseNewPage.pageHeader = pageHeader;

export default CourseNewPage;
