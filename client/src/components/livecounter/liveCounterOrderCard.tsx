import { OrderStatuses } from "@/constants/orderStatuses"

import { capitalizeFirstChar, cn, getTimeGapString } from "@/lib/utils"
import { MainButtonProps } from "@/components/mainButton"
import {
  fontBodyNormal,
  fontButtonLarge,
  fontButtonSmall,
  fontCaptionNormal,
  fontHeadline,
  fontTitle2,
} from "@/styles/typography"

interface OrderItem {
  name: string
  quantity: number
  status: string
  notes?: string
}

interface LiveCounterOrderCardProps {
  order_id?: string
  order_number: string
  customer_name: string
  order_status: OrderStatuses
  payment_status: "paid" | "unpaid" | string
  time: string
  isSmallIconView?: boolean
  onClick?: React.MouseEventHandler
}

const statusStyles: {
  [key: string]: {
    textColor: string
    bulletColor: string
    buttonVariant: MainButtonProps["variant"]
    borderColor?: string
    borderStyle?: string
  }
} = {
  Ordered: {
    textColor: "text-status-ordered",
    bulletColor: "bg-status-ordered",
    buttonVariant: "accept",
  },
  Ready: {
    textColor: "text-status-ready",
    bulletColor: "bg-status-ready",
    buttonVariant: "ready",
    borderColor: "border-black",
    borderStyle: "border-dashed",
  },
  Closed: {
    textColor: "text-status-ordered",
    bulletColor: "bg-status-ordered",
    buttonVariant: "accept",
    borderColor: "border-white",
  },
  Canceled: {
    textColor: "text-status-ordered",
    bulletColor: "bg-status-ordered",
    buttonVariant: "accept",
    borderColor: "border-white",
  },
  Served: {
    textColor: "text-status-ordered",
    bulletColor: "bg-status-ordered",
    buttonVariant: "accept",
    borderColor: "border-white",
  },
}

const statusMapping: { [key: string]: keyof typeof statusStyles } = {
  ordered: "Ordered",
  preparing: "Preparing",
  accepted: "Ordered",
  advanced: "Advanced",
  ready: "Ready",
  closed: "Closed",
  rejected: "Rejected",
  canceled: "Canceled",
  do_not_accept: "Not Accepted",
  served: "Served",
}

// Create the final statusStyles object
const finalStatusStyles = Object.entries(statusMapping).reduce(
  (acc, [status, mappedStatus]) => {
    acc[status] = statusStyles[mappedStatus]
    return acc
  },
  { ...statusStyles }
)

export const LiveCounterOrderCard = ({
  order_number,
  customer_name,
  order_status,
  payment_status,
  time,
  isSmallIconView,
  onClick,
}: LiveCounterOrderCardProps) => {
  if (isSmallIconView) {
    return (
      <button
        className={cn(
          "h-[56px] w-full rounded-5 border-l-4 bg-white-60 p-3 text-black-100 hover:bg-gray-200 active:bg-gray-400",
          finalStatusStyles[order_status]?.borderColor,
          finalStatusStyles[order_status]?.borderStyle
        )}
        onClick={onClick}
      >
        <div className="flex w-full items-center justify-center">
          <p className={cn(fontHeadline)}>#{order_number}</p>
        </div>
      </button>
    )
  }
  return (
    <button
      className={cn(
        "flex h-[136px] w-full flex-col rounded-5 border-l-4 bg-white-60 p-4 text-black-100",
        finalStatusStyles[order_status]?.borderColor,
        finalStatusStyles[order_status]?.borderStyle
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h2 className={cn("line-clamp-1 overflow-ellipsis", fontTitle2)}>
          #{order_number ?? "-"}
        </h2>
      </div>
      <div
        className={cn(
          "truncate whitespace-nowrap text-left text-black-60",
          fontCaptionNormal
        )}
      >
        {!customer_name || customer_name.trim() === "" ? "-" : customer_name}
      </div>
      <div className="mt-auto flex flex-row items-end justify-between">
        <div className="flex flex-col items-start">
          <div
            className={cn(
              "flex text-black",
              fontCaptionNormal,
              `${statusMapping[order_status] !== "Canceled" ? "" : "text-red-500"}`
            )}
          >
            {capitalizeFirstChar(order_status) || "-"}
          </div>
          <span className={cn(fontCaptionNormal, "text-black-60")}>
            {getTimeGapString(time) ?? "-:-:-"}
          </span>
        </div>
        {payment_status === "paid" && (
          <div
            className={cn(
              "flex rounded-lg bg-green-300 px-2 py-1 text-green-700",
              fontButtonSmall
            )}
          >
            Paid
          </div>
        )}
      </div>
    </button>
  )
}
