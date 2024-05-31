import { MembersResponse, courses, insMembers, updMembers } from "@/client/member";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";

interface IProductFormProps {
  id?: string;
  initialValues?: Partial<MembersResponse>;
}

const CustomerForm = ({ id, initialValues }: IProductFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: any) => {
    try {
      setIsLoading(true);

      if (id) {
        await updMembers(Number(id), formValue);
        messageApi.success("수정되었습니다");
      } else {
        await insMembers(formValue);
        messageApi.success("생성되었습니다");
      }
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
      window.location.href = "/customer/list";

    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm form={form} initialValues={initialValues?.response?.result[0].member} onFinish={handleFinish}>
        <FormSection title="수강생 정보" description="수강생 정보를 입력해주세요">        

          <FormGroup title="이름*">
            <Form.Item name="name" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="이름을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="생일*">
            <Form.Item name="birth_day" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="생년월일을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="연락처*">
            <Form.Item name="phone" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="연락처를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="보호자 연락처*">
            <Form.Item name="parent_phone" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="보호자 연락처를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="학교명*">
            <Form.Item name="institution_name" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="학교를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />
          {id && (
          <FormGroup title="수강 정보">
            {initialValues?.response?.result[0].courses?.map((course:courses) => (
              <div key={course.id} style={{ marginBottom: '16px' }}>
                <div>클래스 타입: {course.class_type}</div>
                <div>시작 날짜: {course.start_date ? new Date(course.start_date).toLocaleDateString() : '날짜 없음'}</div>
                <div>종료 날짜: {course.end_date ? new Date(course.end_date).toLocaleDateString() : '날짜 없음'}</div>
                <div>세션 수: {course.session_count}</div>
                <div>결제 금액: {course.payment_amount}</div>
                <Divider />
              </div>
            ))}
          </FormGroup>
          )}
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

export default React.memo(CustomerForm);
