import { MembersParams } from "@/client/member";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import moment from "moment"; // moment 라이브러리 추가
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

const CustomerSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  // 쿼리스트링에서 값을 읽어와 폼 필드에 설정하는 useEffect
  useEffect(() => {
    const { searchType, searchText, start_date, end_date } = router.query;

    // 날짜 필드는 moment 객체로 변환하여 설정
    const searchDatePeriod = [start_date ? moment(start_date) : null, end_date ? moment(end_date) : null];

    form.setFieldsValue({
      searchType,
      searchText,
      searchDatePeriod: searchDatePeriod.filter(Boolean).length ? searchDatePeriod : undefined, // 필터링된 값만 설정
    });
  }, [router.query, form]);

  const handleFinish = useCallback(
    (formValue: MembersParams) => {
      // 날짜 범위를 개별 필드로 분리
      const { searchDatePeriod, ...restFormValue } = formValue;
      const [start_date, end_date] = searchDatePeriod || [];

      // 새로운 쿼리 객체 생성
      const query = {
        ...router.query,
        ...restFormValue,
        ...(start_date && { start_date: start_date.format("YYYY-MM-DD") }),
        ...(end_date && { end_date: end_date.format("YYYY-MM-DD") }),
      };

      router.push({
        pathname: router.pathname,
        query,
      });
    },
    [router]
  );

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
