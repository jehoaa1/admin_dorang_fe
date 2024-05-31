import { ClassBookingResponse, IClassBooking, UClassBooking, insClassBooking, updClassBooking } from "@/client/class-booking";
import { useCourseRemainSessionCount } from "@/client/course";
import DateRangeField from "@/components/shared/form/control/date-time-field";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Radio, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import React, { useState } from "react";

interface IClassBookingFormProps {
  id?: string;
  initialValues?: Partial<ClassBookingResponse>;
}

const ClassBookingForm = ({ id, initialValues }: IClassBookingFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { data, error } = useCourseRemainSessionCount();  

  const handleFinish = async (formValue: any) => {
    try {
      setIsLoading(true);
      const reservation_date = dayjs(formValue.searchDatePeriod[0]).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:00");
      const Iparam: IClassBooking = {
        course_id: formValue.course_id,
        reservation_date:reservation_date,
        enrollment_status: formValue.enrollment_status
      }
      const Uparam: UClassBooking = {
        reservation_date:reservation_date,
        enrollment_status: formValue.enrollment_status
      }
      if (id) {
        await updClassBooking(Number(id), Uparam);
        messageApi.success("수정되었습니다");
      } else {
        await insClassBooking(Iparam);
        messageApi.success("생성되었습니다");
      }
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
      window.location.href = "/class-booking/list";
    }
  };
  
  const editData = {...initialValues?.response?.result[0], searchDatePeriod: [dayjs(initialValues?.response?.result[0].reservation_date)]};
  
  return (
    <>
      {contextHolder}
      <DefaultForm form={form} initialValues={editData} onFinish={handleFinish}>
        <FormSection title="강의 예약" description="강의 예약입니다.">        

          <FormGroup title="이름*">
            <Form.Item name="course_id" rules={[{ required: true, message: "필수값입니다" }]}>
            <Select
              showSearch
              disabled={!!id} 
              placeholder="회원을 선택해주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {data?.response?.result.map((element: any) => (
                <Select.Option key={element.id} value={element.id}>
                  [클래스:{element.class_type}] {element.member.name} ({new Date(element.start_date).toLocaleDateString()} ~ {new Date(element.end_date).toLocaleDateString()})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="예약시간*">
            <Form.Item name="searchDatePeriod">
              <DateRangeField/>
            </Form.Item>
          </FormGroup>

          <FormGroup title="수강상태*">
            <Form.Item name="enrollment_status" initialValue="1">
              <Radio.Group>
                <Radio.Button value="1">수강 준비</Radio.Button>
                <Radio.Button value="2">수강 완료</Radio.Button>
                <Radio.Button value="3">수강 취소</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FormGroup>

          <Divider />

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

export default React.memo(ClassBookingForm);
