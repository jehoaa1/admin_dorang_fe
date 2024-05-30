import { MembersParams, delMembers, getMembers, useMembers } from "@/client/member";
import { IDefaultLayoutPage, IPageHeader, getDefaultLayout } from "@/components/layout/default-layout";
import CustomerList from "@/components/page/customer/customer-list";
import CustomerSearch from "@/components/page/customer/customer-search";
import { useRouter } from "next/router";
import { useState } from 'react';

const pageHeader: IPageHeader = {
  title: "수강생 목록",
};

const CustomerListPage: IDefaultLayoutPage = () => {    
  const router = useRouter();
  const { data, error, isLoading } = useMembers({ page: router.query.page ? Number(router.query.page) : 1 });  
  const [dataC, setDataC] = useState(data);
  
  const refunc = async(params: MembersParams = {}) => {
    const startDate = params.searchDatePeriod?.[0]?.toISOString().split("T")[0];
    const endDate = params.searchDatePeriod?.[1]?.toISOString().split("T")[0];
    const name = params.searchType == 'name' && params.searchText;
    const phone = params.searchType == 'phone' && params.searchText;
    const parent_phone = params.searchType == 'parent_phone' && params.searchText;
    try {
      const result = await getMembers({
        name: name || undefined,
        phone: phone || undefined,
        parent_phone: parent_phone || undefined,
        start_date: startDate,
        end_date: endDate,
        page: router.query.page ? Number(router.query.page) : 1
      });

      setDataC(result);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };


  return (
    <>
      <CustomerSearch handleFinish={refunc} />
      <CustomerList data={(dataC || data) || { result: "", result_msg: "", response: {} }} delMembers={delMembers} />
    </>
  );
};

CustomerListPage.getLayout = getDefaultLayout;
CustomerListPage.pageHeader = pageHeader;

export default CustomerListPage;
