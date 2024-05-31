import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CourseForm from "@/components/page/course/course-form";

const pageHeader: IPageHeader = {
  title: "수강 등록",
};

const CourseNewPage: IDefaultLayoutPage = () => {
  return <CourseForm initialValues={{}} />;
};

CourseNewPage.getLayout = getDefaultLayout;
CourseNewPage.pageHeader = pageHeader;

export default CourseNewPage;
