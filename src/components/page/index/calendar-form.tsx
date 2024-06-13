import { Badge, BadgeProps, Calendar, CalendarProps, Modal } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import EasyClassBookingModal from "./easy-class-booking-modal";

interface ListItem {
  date: string;
  type: string;
  content: string;
}

interface CalendarFormProps {
  setSelDate: React.Dispatch<React.SetStateAction<Date>>;
  choiceDate: Date;
  classBookingList: ListItem[];
  getCourse: (startDate:string, endDate:string) => void;
}

const CalendarForm: React.FC<CalendarFormProps> = ({
  setSelDate,
  choiceDate,
  classBookingList,
  getCourse
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dateCellRender = useCallback((value: Dayjs) => { 
    let key = 0;   
    return (
      <ul className="events">
        {classBookingList.map(
          (item) => {  
            const dateTime = item.date.split("T")
            if(value.format('YYYY-MM-DD') == dateTime[0]){
              return (
                <li key={key++}>
                  <Badge status={item.type as BadgeProps["status"]} text={`${item.content}(${dateTime[1]})`} />
                </li>
              )
            }else{
              return (
                <li key={key++}></li>
              )
            }
          }
        )}
      </ul>
    );
  }, [classBookingList]);

  const headerRender = useCallback((config: any) => {
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

  }, []);

  const cellRender: CalendarProps<Dayjs>['cellRender'] = useCallback((current: Dayjs, info: { type: string, originNode: React.ReactNode }) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  }, [dateCellRender]);

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Calendar
        cellRender={cellRender}
        mode="month"
        onSelect={(data)=>{        
          if(dayjs(choiceDate).format('YYYY-MM-DD') == data.format('YYYY-MM-DD')){
            console.log('간편 강의 예약 창 오픈')
            setIsModalVisible(true);
          }else{
            setSelDate(data.toDate())
          }
        }}
        headerRender={headerRender}
        onPanelChange={(value)=>getCourse(value.startOf('month').format('YYYY-MM-DD'), value.endOf('month').format('YYYY-MM-DD'))}
      />

      <Modal
        title="강의 예약"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null} // Footer를 제거하고 EasyClassBookingModal의 버튼을 사용
      >
        <EasyClassBookingModal selDate={choiceDate} modalClose={handleModalCancel} getCourse={getCourse}/>
      </Modal>
    </>
  );
};

export default React.memo(CalendarForm);
