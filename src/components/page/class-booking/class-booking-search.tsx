import { ClassBookingParams } from "@/client/class-booking";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import React from "react";

interface ClassBookingSearchProps {
  handleFinish: (params: ClassBookingParams) => void;
}

const ClassBookingSearch: React.FC<ClassBookingSearchProps> = ({ handleFinish }) => {
  const [form] = useForm();

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <FieldInline>
          <Form.Item label="기간" name="searchDateType" initialValue="created">
            <Select>
              <Select.Option value="created">예약일</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="searchDatePeriod">
            <DateRangeField />
          </Form.Item>
        </FieldInline>
        <div>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="name">
              <Select style={{ width: 140 }}>
                <Select.Option value="name">이름</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="searchText" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
            </Form.Item>
          </FieldInline>
        </div>
        <div>
          <FieldInline>
            <Form.Item label="클래스" name="class_type" initialValue="">
              <Radio.Group>
                <Radio.Button value="">전체</Radio.Button>
                <Radio.Button value="1">오감</Radio.Button>
                <Radio.Button value="2">베이지</Radio.Button>
                <Radio.Button value="3">브레인</Radio.Button>
                <Radio.Button value="4">테크닉</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FieldInline>
        </div>
        <div>
          <FieldInline>
            <Form.Item label="예약상태" name="enrollment_status" initialValue="">
              <Radio.Group>
                <Radio.Button value="">전체</Radio.Button>
                <Radio.Button value="1">수강준비</Radio.Button>
                <Radio.Button value="2">수강완료</Radio.Button>
                <Radio.Button value="3">수강취소</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </FieldInline>
        </div>
      </FormSearch>
      <div className="flex justify-center gap-2">
        <Button htmlType="submit" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
        <Button className="btn-with-icon" onClick={() => form.resetFields()}>
          초기화
        </Button>
      </div>
    </DefaultSearchForm>
  );
};

export default React.memo(ClassBookingSearch);
