import { Members, MembersResponse } from "@/client/member";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const CustomerList = ({data}: {data: MembersResponse}) => {
  const router = useRouter();
  
  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );
  
  const columns: ColumnsType<Members> = [
    {
      title: "수강생 번호",
      align: "center",
      width: 60,
      render: (_value: unknown, record: Members) => {
        return (<span>{record.member.id}</span>)
      }
    },
    {
      title: "이름",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Members) => {
        return (<span>{record.member.name}</span>)
      }
    },
    {
      title: "연락처",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Members) => {
        return (<span>{record.member.phone}</span>)
      }      
    },
    {
      title: "보호자 연락처",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Members) => {
        return (<span>{record.member.parent_phone}</span>)
      }
    },
    {
      title: "학교명",
      align: "center",
      width: 120,
      render: (_value: unknown, record: Members) => {
        return (<span>{record.member.institution_name}</span>)
      }
    },
    {
      key: "action",
      width: 100,
      align: "center",
      render: (_value: unknown, record: Members) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/sample/product/edit/${record.member.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="상품을 삭제하시겠습니까?"
              onConfirm={() => alert("삭제")}
              okText="예"
              cancelText="아니오"
            >
              <a className="px-2 py-1 text-sm btn">삭제</a>
            </Popconfirm>
          </span>
        );
      },
    }
  ];

  return (
    <>
      <DefaultTableBtn className="justify-between">
        <div className="flex-item-list">
          <Button type="primary" onClick={() => router.push("/sample/product/new")}>
            수강생 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<Members>
        rowKey={(record) => (record.member).id} // rowKey 설정
        columns={columns}
        dataSource={data?.response.result || []}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 10,
          total: data?.response?.total_count || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.response?.total_count}
      />
    </>
  );
};

export default React.memo(CustomerList);
