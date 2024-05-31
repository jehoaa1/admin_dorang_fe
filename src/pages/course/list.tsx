import { CoursesParams, delCourses, getCourses, useCourses } from "@/client/course";
import { IDefaultLayoutPage, IPageHeader, getDefaultLayout } from "@/components/layout/default-layout";
import CourseList from "@/components/page/course/course-list";
import CourseSearch from "@/components/page/course/course-search";
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { useState } from 'react';

const pageHeader: IPageHeader = {
  title: "수강신청",
};

const CourseListPage: IDefaultLayoutPage = () => {    
  const router = useRouter();
  const { data, error, isLoading } = useCourses({ page: router.query.page ? Number(router.query.page) : 1 });  
  const [dataC, setDataC] = useState(data);
  
  const refunc = async(params: CoursesParams = {}) => {
    const startDate = params.searchDatePeriod?.[0] ? dayjs(params.searchDatePeriod[0]).tz("Asia/Seoul").format("YYYY-MM-DD") : null;
    const endDate = params.searchDatePeriod?.[1] ? dayjs(params.searchDatePeriod[1]).tz("Asia/Seoul").format("YYYY-MM-DD") : null;
    const name = params.searchType == 'name' && params.searchText;
    const phone = params.searchType == 'phone' && params.searchText;
    const parent_phone = params.searchType == 'parent_phone' && params.searchText;
    try {
      const result = await getCourses({
        name: name || undefined,
        phone: phone || undefined,
        parent_phone: parent_phone || undefined,
        class_type: params.class_type,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
        page: router.query.page ? Number(router.query.page) : 1
      });

      setDataC(result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };


  return (
    <>
      <CourseSearch handleFinish={refunc} />
      <CourseList data={(dataC || data) || { result: "", result_msg: "", response: {result: [],total_count:0} }} delCourses={delCourses} />
    </>
  );
};

CourseListPage.getLayout = getDefaultLayout;
CourseListPage.pageHeader = pageHeader;

export default CourseListPage;
