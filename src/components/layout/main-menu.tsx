import { Divider } from "antd";
import { Home, Monitor, Package2 } from "lucide-react";
import React from "react";
import Menu, { IMenu } from "./nav";

const mainMenuData: IMenu[] = [
  {
    id: "home",
    name: "홈",
    icon: <Home className="w-5 h-5" />,
    link: {
      path: "/",
    },
  },
  {
    id: "customer",
    name: "수강생 관리",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "customerList",
        name: "수강생",
        link: {
          path: "/customer/list",
        },
      },{
        id: "courseList",
        name: "수강신청",
        link: {
          path: "/course/list",
        },
      },
    ],
  },
  {
    id: "classBooking",
    name: "강의 관리",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "classBookingList",
        name: "강의 예약",
        link: {
          path: "/class-booking/list",
        },
      },
    ],
  },
];

const devMenuData: IMenu[] = [
  {
    id: "dev",
    name: "사용 가이드",
    icon: <Monitor className="w-5 h-5" />,
    submenu: [
      {
        name: "폼",
        link: {
          path: "/sample/form",
        },
      },
    ],
  },
];

const MainMenu = () => {
  return (
    <>
      <>
        <Divider orientation="left" plain>
          메인
        </Divider>

        <Menu data={mainMenuData} />
      </>
      {/* <>
        <Divider orientation="left" plain>
          개발
        </Divider>

        <Menu data={devMenuData} />
      </> */}
    </>
  );
};

export default React.memo(MainMenu);
