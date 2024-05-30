import { MembersParams } from "@/client/member";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import React from "react";

interface CustomerSearchProps {
  handleFinish: (params: MembersParams) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ handleFinish }) => {
  const [form] = useForm();

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <FieldInline>
          <Form.Item label="기간" name="searchDateType" initialValue="created">
            <Select>
              <Select.Option value="created">등록일자</Select.Option>
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
                <Select.Option value="phone">연락처</Select.Option>
                <Select.Option value="parentPhone">보호자 연락처</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="searchText" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
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

export default React.memo(CustomerSearch);
