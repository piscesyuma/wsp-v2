'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  fontTitle1, 
  fontTitle2, 
  fontBodyBold 
} from '@/styles/typography';
import { Tab } from '@/components/tab';
import { CustomSelect } from '@/components/select';
import PopularItems from '@/components/PopularItems';
import {
  AssignmentTurnedInIcon,
  CancelIcon,
  CheckCircleIcon,
  LabProfileIcon,
  MonetizationIcon,
  ReceiptLongIcon,
} from "@/icons";
import { CompletedOrdersChart } from './CompletedOrdersChart';
import { PaymentDistribution } from './PaymentDistribution';

// Mock data for the dashboard
const mockData = {
  revenue: "$3,145.00",
  allOrders: 290,
  paidOrders: 173,
  acceptedOrders: 38,
  completedOrders: 155,
  canceledOrders: 8,
};

const yearlyCompletedOrders = [
  { frequency: "Jan", orders: 269 }, { frequency: "Feb", orders: 285 },
  { frequency: "Mar", orders: 255 }, { frequency: "Apr", orders: 240 },
  { frequency: "May", orders: 290 }, { frequency: "Jun", orders: 269 },
  { frequency: "Jul", orders: 310 }, { frequency: "Aug", orders: 285 },
  { frequency: "Sep", orders: 255 }, { frequency: "Oct", orders: 240 },
  { frequency: "Nov", orders: 290 }, { frequency: "Dec", orders: 269 }
]

// Range options for the date filter
const rangeOptions = [
  { value: "Today", label: "Today" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Yearly", label: "Yearly" },
];

// Frequency mapping for the completed orders chart
const frequencyMap = {
  Today: "hourly",
  Weekly: "daily",
  Monthly: "weekly",
  Yearly: "monthly",
};

// Function to get date range based on selected range
const getDateRange = (range: string) => {
  const today = new Date();
  let startDate = new Date();
  
  switch (range) {
    case "Today":
      startDate = today;
      break;
    case "Weekly":
      startDate.setDate(today.getDate() - 7);
      break;
    case "Monthly":
      startDate.setMonth(today.getMonth() - 1);
      break;
    case "Yearly":
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    default:
      startDate = today;
  }
  
  return {
    start_date: startDate.toISOString(),
    end_date: today.toISOString(),
  };
};

// Function to get chart date range
const getChartDateRange = getDateRange;

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState("Today");
  const [currentStatus, setCurrentStatus] = useState("OPEN");

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
  };

  return (
    <div className="h-screen flex flex-col gap-2 overflow-y-auto px-4">
      {/* Header Section */}
      <div className="w-full py-7 flex items-center justify-between">
        <h1 className={cn(fontTitle1, "text-black-100")}>Dashboard</h1>
        <CustomSelect
          options={rangeOptions}
          sortByText="Range:"
          onOptionSelect={(option) => setSelectedRange(option.value as string)}
          defaultValue={rangeOptions[0]}
          menuPosition="left"
          selectWidth="w-48"
        />
      </div>

      {/* Restaurant Status Section */}
      <div className="my-2 min-h-[96px] w-full flex items-center justify-start gap-3 rounded-3 bg-black-5 p-4 hidden lg:flex">
        <h2 className={cn(fontTitle2, "text-black-100 mr-4")}>Restaurant Status</h2>
        <Tab
          variant="primary"
          isActive={currentStatus === "OPEN"}
          className={cn(currentStatus === "OPEN" && "bg-semantic-green-100", "px-6")}
          onClick={() => handleStatusChange("OPEN")}
        >
          OPEN
        </Tab>
        <Tab
          variant="primary"
          isActive={currentStatus === "BUSY"}
          className={cn(currentStatus === "BUSY" && "bg-semantic-yellow-100 text-black", "px-6")}
          onClick={() => handleStatusChange("BUSY")}
        >
          BUSY
        </Tab>
        <Tab
          variant="primary"
          isActive={currentStatus === "CLOSED"}
          className={cn(currentStatus === "CLOSED" && "bg-semantic-red-100", "px-6")}
          onClick={() => handleStatusChange("CLOSED")}
        >
          CLOSED
        </Tab>
      </div>

      {/* Statistics Overview Section */}
      <div className="grid min-w-[196px] grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {/* Revenue Card */}
        <div className="h-[160px] w-full rounded-3 bg-brand p-4 text-white-100 lg:h-[190px]">
          <div className="flex flex-col h-full justify-between">
            <MonetizationIcon className="h-6 w-6" />
            <div>
              <p className={cn(fontBodyBold, "text-white-100")}>Revenue</p>
              <p className={cn(fontTitle2, "text-white-100")}>{mockData.revenue}</p>
            </div>
          </div>
        </div>

        {/* All Orders Card */}
        <div className="h-[160px] w-full rounded-3 bg-white-100 p-4 lg:h-[190px]">
          <div className="flex flex-col h-full justify-between">
            <LabProfileIcon className="h-6 w-6 text-black-100" />
            <div>
              <p className={cn(fontBodyBold, "text-black-100")}>All Order</p>
              <p className={cn(fontTitle2, "text-black-100")}>{mockData.allOrders}</p>
            </div>
          </div>
        </div>

        {/* Paid Orders Card */}
        <div className="h-[160px] w-full rounded-3 bg-white-100 p-4 lg:h-[190px]">
          <div className="flex flex-col h-full justify-between">
            <ReceiptLongIcon className="h-6 w-6 text-black-100" />
            <div>
              <p className={cn(fontBodyBold, "text-black-100")}>Paid Orders</p>
              <p className={cn(fontTitle2, "text-black-100")}>{mockData.paidOrders}</p>
            </div>
          </div>
        </div>

        {/* Accepted Card */}
        <div className="h-[160px] w-full rounded-3 bg-white-100 p-4 lg:h-[190px]">
          <div className="flex flex-col h-full justify-between">
            <AssignmentTurnedInIcon className="h-6 w-6 text-black-100" />
            <div>
              <p className={cn(fontBodyBold, "text-black-100")}>Accepted</p>
              <p className={cn(fontTitle2, "text-black-100")}>{mockData.acceptedOrders}</p>
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="h-[160px] w-full rounded-3 bg-white-100 p-4 lg:h-[190px]">
          <div className="flex flex-col h-full justify-between">
            <CheckCircleIcon className="h-6 w-6 text-black-100" />
            <div>
              <p className={cn(fontBodyBold, "text-black-100")}>Completed</p>
              <p className={cn(fontTitle2, "text-black-100")}>{mockData.completedOrders}</p>
            </div>
          </div>
        </div>

        {/* Canceled Card */}
        <div className="h-[160px] w-full rounded-3 bg-white-100 p-4 lg:h-[190px]">
          <div className="flex flex-col h-full justify-between">
            <CancelIcon className="h-6 w-6 text-semantic-red" />
            <div>
              <p className={cn(fontBodyBold, "text-black-100")}>Canceled</p>
              <p className={cn(fontTitle2, "text-black-100")}>{mockData.canceledOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Reports Section */}
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        {/* Popular Items */}
        <div className="col-span-1 lg:col-span-1">
          <PopularItems
            startDate={getDateRange(selectedRange).start_date}
            endDate={getDateRange(selectedRange).end_date}
          />
        </div>

        {/* Completed Orders and Payment Distribution */}
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-1">
          <CompletedOrdersChart
            startDate="2024-03-01"
            endDate="2024-03-07"
            frequency={frequencyMap[selectedRange as keyof typeof frequencyMap] as "daily" | "weekly" | "monthly" | "yearly"}
            mockData={yearlyCompletedOrders}  
            />
          <PaymentDistribution
            startDate="2024-03-01"
            endDate="2024-03-07"
            mockData={{
              Card: 9300,
              PayPal: 5600,
              "Apple pay": 3921,
              Cash: 13900,
              Crypto: 1900
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 