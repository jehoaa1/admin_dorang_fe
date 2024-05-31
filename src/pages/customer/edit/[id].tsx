import { useMembers } from "@/client/member";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CustomerForm from "@/components/page/customer/customer-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const PageHeader: IPageHeader = {
  title: "수강생 수정",
};

const CustomerEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const memberId = Number(router.query.id);
  const { data, error, isLoading } = useMembers({id:memberId});


  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading ) {
    return <Skeleton className="my-5" />;
  }

  return <CustomerForm id={router.query.id as string} initialValues={data} />;
};

CustomerEditPage.getLayout = getDefaultLayout;
CustomerEditPage.pageHeader = PageHeader;

export default CustomerEditPage;
