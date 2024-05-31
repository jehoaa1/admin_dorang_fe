import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs"; // 수정된 부분
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from "react";

// 플러그인들을 사용할 수 있도록 설정
dayjs.extend(utc); // 수정된 부분
dayjs.extend(timezone); // 수정된 부분

const seoulTime = (date?: dayjs.ConfigType) => dayjs(date).tz("Asia/Seoul"); // 수정된 부분

interface IDateTimeFieldProps {
  value?: Dayjs | null; // 수정된 부분
  onChange?: (value: (dayjs.Dayjs | null)[]) => void;
}

const DateTimeField = ({ value, onChange }: IDateTimeFieldProps) => {
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    onChange?.([date]); 
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DatePicker
        showTime
        placeholder="날짜 및 시간 선택"
        onChange={handleDateChange} // 변경된 부분
        value={value ? seoulTime(value) : null}
      />
    </div>
  );
};

export default React.memo(DateTimeField);
