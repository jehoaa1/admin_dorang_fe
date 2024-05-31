import { CoursesResponse, ICourses, insCourses, updCourses } from "@/client/course";
import { useMembers } from "@/client/member";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, Radio, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import React, { useState } from "react";

interface ICourseFormProps {
  id?: string;
  initialValues?: Partial<CoursesResponse>;
}

const CourseForm = ({ id, initialValues }: ICourseFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { data, error } = useMembers();  

  const handleFinish = async (formValue: any) => {
    try {
      setIsLoading(true);
      const startDate = dayjs(formValue.searchDatePeriod[0]).tz("Asia/Seoul").format("YYYY-MM-DD");
      const endDate = dayjs(formValue.searchDatePeriod[1]).tz("Asia/Seoul").format("YYYY-MM-DD");
      const param: ICourses = {
        members_id: formValue.members_id,
        class_type:formValue.class_type,
        start_date:new Date(startDate),
        end_date:new Date(endDate),
        session_count:formValue.session_count,
        payment_amount:formValue.payment_amount
      }
      if (id) {
        await updCourses(Number(id), param);
        messageApi.success("수정되었습니다");
      } else {
        await insCourses(param);
        messageApi.success("생성되었습니다");
      }
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
      window.location.href = "/course/list";
    }
  };
  
  const editData = {...initialValues?.response?.result[0], searchDatePeriod: [
    dayjs(initialValues?.response?.result[0].start_date),
    dayjs(initialValues?.response?.result[0].end_date)
  ]};
  
  return (
    <>
      {contextHolder}
      <DefaultForm form={form} initialValues={editData} onFinish={handleFinish}>
        <FormSection title="수강신청" description="수강 정보를 입력해주세요">        

          <FormGroup title="이름*">
            <Form.Item name="members_id" rules={[{ required: true, message: "필수값입니다" }]}>
            <Select
              showSearch
              placeholder="회원을 선택해주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {data?.response.result.map((element: any) => (
                <Select.Option key={element.member.id} value={element.member.id}>
                  {element.member.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="클레스*">
            <Form.Item name="class_type" initialValue="1">
              <Radio.Group>
                <Radio.Button value="1">클레스 1</Radio.Button>
                <Radio.Button value="2">클레스 2</Radio.Button>
                <Radio.Button value="3">클레스 3</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="수강기간*">
            <Form.Item name="searchDatePeriod">
              <DateRangeField viewType={2}/>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="수업 횟수*">
            <Form.Item name="session_count" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="수업 횟수를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="결제금액*">
            <Form.Item name="payment_amount" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="결제금액을 입력하세요" />
            </Form.Item>
          </FormGroup>

        </FormSection>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(CourseForm);
