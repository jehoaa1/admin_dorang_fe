import { useCourses } from "@/client/course";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CourseForm from "@/components/page/course/course-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const PageHeader: IPageHeader = {
  title: "수강 수정",
};

const CourseEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const courseId = Number(router.query.id);
  const { data, error, isLoading } = useCourses({id:courseId});


  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading ) {
    return <Skeleton className="my-5" />;
  }

  return <CourseForm id={router.query.id as string} initialValues={data} />;
};

CourseEditPage.getLayout = getDefaultLayout;
CourseEditPage.pageHeader = PageHeader;

export default CourseEditPage;
