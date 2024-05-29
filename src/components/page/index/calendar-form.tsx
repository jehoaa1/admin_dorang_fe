import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import { Dayjs } from "dayjs";
import React from "react";
interface ListItem {
  type: string;
  content: string;
}

interface CalendarFormProps {
  selDate: Date; // selDate는 Date 타입
  setSelDate: React.Dispatch<React.SetStateAction<Date>>; // setSelDate는 Date 타입을 업데이트하는 함수
  classBookingList: any[]; // 'any' 대신 적절한 타입으로 변경하세요.
}


const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "외부 미팅" },
        { type: "success", content: "내부 미팅" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "외부 미팅" },
        { type: "success", content: "내부 미팅" },
        { type: "error", content: "미팅 1" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "외부 미팅" },
        { type: "success", content: "내부 미팅" },
        { type: "error", content: "미팅 1." },
        { type: "error", content: "미팅 2." },
        { type: "error", content: "미팅 3." },
        { type: "error", content: "미팅 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarForm: React.FC<CalendarFormProps> = ({ selDate, setSelDate }, classBookingList) => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const headerRender = (config: any) => {
    const { value, onChange, type } = config;
    const year = value.year();
    const month = value.month() + 1;

    const handlePrevMonth = () => {
      onChange(value.clone().subtract(1, 'month'));
    };

    const handleNextMonth = () => {
      onChange(value.clone().add(1, 'month'));
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
  };


  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar 
      cellRender={cellRender} 
      mode="month" 
      onChange={(data) => setSelDate(data.toDate())} // Dayjs 객체를 Date 객체로 변환
      headerRender={headerRender} 
    />
  );
};

export default React.memo(CalendarForm);
