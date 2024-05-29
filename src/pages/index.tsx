import { useDashboard } from "@/client/sample/dashboard";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CalendarForm from "@/components/page/index/calendar-form";
import Statistic from "@/components/page/index/statistic";
import { useAuth } from "@/lib/auth/auth-provider";
import { Alert, Divider, Skeleton } from "antd";

const pageHeader: IPageHeader = {
  title: "아트히어로",
};

const IndexPage: IDefaultLayoutPage = () => {
  const { session } = useAuth();
  const { data, error } = useDashboard();

  return (
    <>
      <h2 className="title">👋 {session.user.name || "관리자"}님 안녕하세요!</h2>

      <div className="my-5">
        {data ? (
          <Statistic data={data} />
        ) : error ? (
          <Alert message="대시보드 API 호출 중 오류가 발생했습니다." type="warning" />
        ) : (
          <Skeleton />
        )}
      </div>

      <Divider />

      <h3 className="title">달력</h3>

      <CalendarForm />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
