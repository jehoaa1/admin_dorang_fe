import { ClassBooking, ClassBookingResponse } from "@/client/class-booking";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export interface ClassBookingListProps {
  data: ClassBookingResponse;
  delClassBooking: (id: number) => Promise<void>; // delClassBooking ID를 받아서 삭제를 수행하는 함수
}

const ClassBookingList: React.FC<ClassBookingListProps>= ({ data, delClassBooking }) => {
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
  
  const columns: ColumnsType<ClassBooking> = [
    {
      title: "강의예약 번호",
      align: "center",
      width: 60,
      render: (_value: unknown, record: ClassBooking) => {
        return (<span>{record.id}</span>)
      }
    },    
    {
      title: "이름",
      align: "center",
      width: 100,
      render: (_value: unknown, record: ClassBooking) => {
        return (<span>{record.member.name}</span>)
      }
    },    
    {
      title: "클레스",
      align: "center",
      width: 100,
      render: (_value: unknown, record: ClassBooking) => {
        return (<span>{record.course.class_type}</span>)
      }
    },
    {
      title: "예약시간",
      align: "center",
      width: 150,
      render: (_value: unknown, record: ClassBooking) => {
        return (<span>{new Date(record.reservation_date).toLocaleString()}</span>)
      }
    },
    {
      title: "예약상태",
      align: "center",
      width: 100,
      render: (_value: unknown, record: ClassBooking) => {
        return (<span>{record.enrollment_status}</span>)
      }
    },
    {
      key: "action",
      width: 100,
      align: "center",
      render: (_value: unknown, record: ClassBooking) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/class-booking/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="강의 예약 삭제하시겠습니까?"
              onConfirm={() => delClassBooking(record.id)}
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
          <Button type="primary" onClick={() => router.push("/class-booking/new")}>
            강의 예약
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<ClassBooking>
        rowKey={(record) => record.id} // rowKey 설정
        columns={columns}
        dataSource={data.response.result || []}
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

export default React.memo(ClassBookingList);
