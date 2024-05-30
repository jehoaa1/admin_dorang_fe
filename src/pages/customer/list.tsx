import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CustomerList from "@/components/page/customer/customer-list";
import CustomerSearch from "@/components/page/customer/customer-search";

const pageHeader: IPageHeader = {
  title: "수강생 목록",
};

const CustomerListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <CustomerSearch />
      <CustomerList />
    </>
  );
};

CustomerListPage.getLayout = getDefaultLayout;
CustomerListPage.pageHeader = pageHeader;

export default CustomerListPage;
