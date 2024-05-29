import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import { Dayjs } from "dayjs";
import React, { useCallback } from "react";

interface ListItem {
  type: string;
  content: string;
}

interface CalendarFormProps {
  setSelDate: React.Dispatch<React.SetStateAction<Date>>;
  classBookingList: ListItem[];
  setClassBookingList: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

const CalendarForm: React.FC<CalendarFormProps> = ({
  setSelDate,
  classBookingList,
  setClassBookingList,
}) => {

  const dateCellRender = useCallback((value: Dayjs) => {
    return (
      <ul className="events">
        {classBookingList.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }, [classBookingList]);

  const handleSetClassBooking = useCallback(() => {
    setClassBookingList([
      { type: "warning", content: "왼부" },
      { type: "success", content: "내부 미팅" },
    ]);
    console.log('=====')
  }, [setClassBookingList]);

  const headerRender = useCallback((config: any) => {
    const { value, onChange, type } = config;
    const year = value.year();
    const month = value.month() + 1;
    
    const handlePrevMonth = () => {
      onChange(value.clone().subtract(1, 'month'));
      handleSetClassBooking();
    };

    const handleNextMonth = () => {
      onChange(value.clone().add(1, 'month'));
      handleSetClassBooking()
    };

    return (
      <div style={{ textAlign: 'center' }}>
        {type === 'month' ? (
          <div>
            <button onClick={handlePrevMonth}>&lt;</button>
            <span style={{ margin: '0 10px' }}>
              {year}년 {month}월
            </span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        ) : null}
      </div>
    );
  }, [handleSetClassBooking]);

  const cellRender: CalendarProps<Dayjs>['cellRender'] = useCallback((current: Dayjs, info: { type: string, originNode: React.ReactNode }) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  }, [dateCellRender]);

  return (
    <Calendar
      cellRender={cellRender}
      mode="month"
      onChange={(data) => setSelDate(data.toDate())}
      headerRender={headerRender}
    />
  );
};

export default React.memo(CalendarForm);
