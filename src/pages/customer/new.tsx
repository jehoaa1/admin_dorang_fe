import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CustomerForm from "@/components/page/customer/customer-form";

const pageHeader: IPageHeader = {
  title: "수강생 등록",
};

const CustomerNewPage: IDefaultLayoutPage = () => {
  return <CustomerForm initialValues={{}} />;
};

CustomerNewPage.getLayout = getDefaultLayout;
CustomerNewPage.pageHeader = pageHeader;

export default CustomerNewPage;
