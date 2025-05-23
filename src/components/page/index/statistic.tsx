import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import CountUp from "react-countup";

interface ListItem {
  memberNum: number;
  plan: number;
  done: number;
  cancle: number;
  paymentAmout: number;
}

const renderChangeRate = (value: number) => {
  if (value > 0) {
    return (
      <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-emerald">
        <ArrowUp className="w-5 h-4" />
        {value}%
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-alizarin">
        <ArrowDown className="w-5 h-4" />
        {value}%
      </span>
    );
  }
};

const Statistic: React.FC<ListItem> = ({
  memberNum,
  plan,
  done,
  cancle,
  paymentAmout
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-5 border rounded-lg ">
          <div>수강생</div>
          <div className="mt-3">
            <div className="flex items-center mt-3">
              <div className="text-2xl font-semibold grow">
                <CountUp end={memberNum} separator="," />명
              </div>
              <div>{renderChangeRate(0)}</div>
            </div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>수업 예정</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={plan} separator="," />건
            </div>
            <div>{renderChangeRate(0)}</div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>수업 완료</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={done} separator="," />건
            </div>
            <div>{renderChangeRate(0)}</div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>수업 취소</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={cancle} separator="," />건
            </div>
            <div>{renderChangeRate(0)}</div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>매출</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={paymentAmout} separator="," />건
            </div>
            <div>{renderChangeRate(0)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Statistic);
