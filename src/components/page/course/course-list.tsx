import { Courses, CoursesResponse } from "@/client/course";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { Button, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export interface CourseListProps {
  data: CoursesResponse;
  delCourses: (id: number) => Promise<void>; // delCourses는 ID를 받아서 삭제를 수행하는 함수
}

const CourseList: React.FC<CourseListProps>= ({ data, delCourses }) => {
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
  
  const columns: ColumnsType<Courses> = [
    {
      title: "수강 번호",
      align: "center",
      width: 60,
      render: (_value: unknown, record: Courses) => {
        return (<span>{record.id}</span>)
      }
    },
    {
      title: "클레스",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Courses) => {
        return (<span>{record.class_type}</span>)
      }
    },
    {
      title: "결제일",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Courses) => {
        return (<span>{new Date(record.payment_date).toLocaleDateString()}</span>)
      }
    },
    {
      title: "결제금액",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Courses) => {
        return (<span>{record.payment_amount.toLocaleString()}</span>)
      }
    },    
    {
      title: "수강일",
      align: "center",
      width: 150,
      render: (_value: unknown, record: Courses) => {
        return (<span>{new Date(record.start_date).toLocaleDateString()} ~ {new Date(record.end_date).toLocaleDateString()}</span>)
      }
    },
    {
      title: "이름",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Courses) => {
        return (<span>{record.member.name}</span>)
      }      
    },
    {
      title: "보호자 연락처",
      align: "center",
      width: 100,
      render: (_value: unknown, record: Courses) => {
        return (<span>{record.member.parent_phone}</span>)
      }
    },
    {
      key: "action",
      width: 100,
      align: "center",
      render: (_value: unknown, record: Courses) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/course/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="수강 삭제하시겠습니까?"
              onConfirm={() => delCourses(record.id)}
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
          <Button type="primary" onClick={() => router.push("/course/new")}>
            수강신청
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<Courses>
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

export default React.memo(CourseList);
