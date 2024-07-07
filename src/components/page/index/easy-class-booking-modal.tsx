import { ClassBookingResponse, IClassBooking, insClassBooking } from "@/client/class-booking";
import { useCourseRemainSessionCount } from "@/client/course";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import { Button, Divider, Form, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import React, { useState } from "react";

interface IClassBookingFormProps {
  id?: string;
  selDate: Date;
  modalClose: () => void;
  getCourse: (startDate:string, endDate:string) => void;
  initialValues?: Partial<ClassBookingResponse>;
}

const EasyClassBookingModal = ({ id, selDate, initialValues, modalClose, getCourse }: IClassBookingFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { data, error, mutate: mutateCourse  } = useCourseRemainSessionCount();  
  const hours = [];
  const minutes = [];
  for (let hour = 9; hour <= 21; hour++) {
    hours.push(hour);
  }

  for (let minute = 0; minute <= 50; minute++) {
    if(minute % 10 == 0) minutes.push(minute);
  }

  const handleFinish = async (formValue: any) => {
    try {
      setIsLoading(true);
      const reservation_date = dayjs(selDate).hour(formValue.hour).minute(formValue.minute).format("YYYY-MM-DD HH:mm:00");
      const Iparam: IClassBooking = {
        course_id: formValue.course_id,
        reservation_date:reservation_date,
        enrollment_status: "1"
      }

      await insClassBooking(Iparam);
      messageApi.success("생성되었습니다");
      mutateCourse();
      modalClose();
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);      
      getCourse(dayjs(selDate).startOf('month').format('YYYY-MM-DD'), dayjs(selDate).endOf('month').format('YYYY-MM-DD'));
      //window.location.href = "/";
    }
  };
  
  const editData = {...initialValues?.response?.result[0], searchDatePeriod: [dayjs(initialValues?.response?.result[0].reservation_date)]};
  
  return (
    <>
      {contextHolder}
      <DefaultForm form={form} initialValues={editData} onFinish={handleFinish}>
          <FormGroup title="이름*">
            <Form.Item name="course_id" rules={[{ required: true, message: "필수값입니다" }]}>
            <Select
              showSearch
              disabled={!!id} 
              placeholder="회원을 선택해주세요"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children
                  ? option.children.toString().toLowerCase().includes(input.toLowerCase())
                  : false
              }
            >
              {data?.response?.result.map((element: any) => (
                <Select.Option key={element.id} value={element.id}>
                  [클래스:{element.class_type_txt}] {element.member.name} ({new Date(element.start_date).toLocaleDateString()} ~ {new Date(element.end_date).toLocaleDateString()})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="예약시간*">
            <Form.Item name="hour" rules={[{ required: true, message: "필수값입니다" }]}>
            <Select
              placeholder="시간"
              optionFilterProp="children"
            >
              {hours.map((hour) => (
                <Select.Option key={hour} value={hour}>
                  {hour}
                </Select.Option>
              ))}
            </Select>
            </Form.Item>
            <Form.Item name="minute" rules={[{ required: true, message: "필수값입니다" }]}>
            <Select
              placeholder="분"
              optionFilterProp="children"
            >
              {minutes.map((minute) => (
                <Select.Option key={minute} value={minute}>
                  {minute}
                </Select.Option>
              ))}
            </Select>
            </Form.Item>
          </FormGroup>

          <Divider />

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(EasyClassBookingModal);
