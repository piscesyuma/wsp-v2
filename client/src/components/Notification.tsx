"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  fontTitle1,
  fontHeadline,
  fontBodyNormal,
  fontBodyBold,
  fontCaptionBold,
  fontCaptionNormal,
} from "@/styles/typography"
import { Badge } from "./badge"
import { CustomSelect } from "./select"
import SearchInput from "./searchInput"
import { MainButton } from "./mainButton"
import RadioButton from "./radioButton"
import ToggleSwitch from "./toggleSwitch"

interface NotificationItem {
  id: string
  description: string
  date: string
  time: string
  isRead: boolean
}

export const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      description: '#202 order, "mushroom burger" was "accepted".',
      date: "6 Jan 2024",
      time: "11:32",
      isRead: false,
    },
    {
      id: "2",
      description: '#588 order, "Soda" was Ready.',
      date: "6 Jan 2024",
      time: "11:11",
      isRead: false,
    },
    {
      id: "3",
      description: '#164 order for "Table A101" Placed.',
      date: "6 Jan 2024",
      time: "10:59",
      isRead: false,
    },
    {
      id: "4",
      description: "#202 order was Completed.",
      date: "5 Jan 2024",
      time: "18:36",
      isRead: true,
    },
    {
      id: "5",
      description: '#202 order, "mushroom burger" was "Served".',
      date: "5 Jan 2024",
      time: "18:07",
      isRead: true,
    },
    {
      id: "6",
      description: '#202 order, "mushroom burger" was "Served".',
      date: "5 Jan 2024",
      time: "17:55",
      isRead: true,
    },
    {
      id: "7",
      description: "#202 order was Completed.",
      date: "5 Jan 2024",
      time: "17:17",
      isRead: true,
    },
    {
      id: "8",
      description: '#164 order for "Table A101" Placed.',
      date: "5 Jan 2024",
      time: "17:01",
      isRead: true,
    },
    {
      id: "9",
      description: '#164 order for "Table A101" Placed.',
      date: "5 Jan 2024",
      time: "16:24",
      isRead: true,
    },
    {
      id: "10",
      description: "#202 order was Completed.",
      date: "5 Jan 2024",
      time: "16:20",
      isRead: true,
    },
    {
      id: "11",
      description: '#588 order, "Soda" was Ready.',
      date: "5 Jan 2024",
      time: "16:10",
      isRead: true,
    },
    {
      id: "12",
      description: '#588 order, "Soda" was Ready.',
      date: "5 Jan 2024",
      time: "16:10",
      isRead: true,
    },
    {
      id: "13",
      description: "#202 order, mushroom burger was accepted.",
      date: "6 Jan 2024",
      time: "11:32",
      isRead: true,
    },
    {
      id: "14",
      description: '#588 order, "Soda" was Ready.',
      date: "5 Jan 2024",
      time: "16:10",
      isRead: true,
    },
    {
      id: "15",
      description: "#202 order, mushroom burger was accepted.",
      date: "6 Jan 2024",
      time: "11:32",
      isRead: true,
    },
  ])

  const [notificationFilter, setNotificationFilter] = useState("All")
  const [notificationSetting, setNotificationSetting] = useState("Banner and sound")
  const [playRepeatedly, setPlayRepeatedly] = useState(false)
  const [tableNotifications, setTableNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)

  const notificationFilterOptions = [
    { value: "All", label: "All" },
    { value: "Unread", label: "Unread" },
  ]

  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  const loadMore = () => {
    // Logic to load more notifications
    console.log("Loading more notifications...")
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <header className={cn("w-full py-6 pl-4", "h-[88px]")}>
        <h1 className={cn(fontTitle1, "text-black-100")}>Notifications</h1>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 flex flex-col md:flex-row gap-4">
        {/* Left List Container */}
        <div className="flex-1 bg-white-60 rounded-3 p-4">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-[22px]">
            <div className="flex items-center gap-2">
              <h2 className={cn(fontHeadline, "text-black-100")}>Unread</h2>
              <Badge variant="black" size="small" count={unreadCount} />
            </div>
            <div className="flex items-center gap-2">
              <CustomSelect
                options={notificationFilterOptions}
                defaultValue={{value: notificationFilter, label: notificationFilter}}
                onOptionSelect={(option:{value: unknown, label: string}) => setNotificationFilter(option.value as string)}
                selectWidth="w-[163px]"
                sortByText="Sort by:"
              />
              <SearchInput 
                query="" 
                setQuery={() => {}} 
              />
            </div>
          </div>

          {/* Notification Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black-5">
                  <th
                    className={cn(
                      fontCaptionBold,
                      "text-black-60 py-2 px-4 text-left rounded-l-3"
                    )}
                  >
                    Description
                  </th>
                  <th
                    className={cn(
                      fontCaptionBold,
                      "text-black-60 py-2 px-4 text-left"
                    )}
                  >
                    Date
                  </th>
                  <th
                    className={cn(
                      fontCaptionBold,
                      "text-black-60 py-2 px-4 text-left rounded-r-3"
                    )}
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id} className="border-b border-black-10">
                    <td
                      className={cn(
                        fontBodyNormal,
                        notification.isRead
                          ? "text-black-40"
                          : "text-black-100",
                        "py-2 px-4"
                      )}
                    >
                      {notification.description}
                    </td>
                    <td
                      className={cn(
                        fontCaptionNormal,
                        notification.isRead
                          ? "text-black-40"
                          : "text-black-60",
                        "py-2 px-4"
                      )}
                    >
                      {notification.date}
                    </td>
                    <td
                      className={cn(
                        fontCaptionNormal,
                        notification.isRead
                          ? "text-black-40"
                          : "text-black-60",
                        "py-2 px-4"
                      )}
                    >
                      {notification.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load More Button */}
          <div className="mt-4">
            <MainButton variant="primary" onClick={loadMore}>
              Load More
            </MainButton>
          </div>
        </div>

        {/* Right Settings Container */}
        <div className="bg-white-60 rounded-3 p-4 w-[360px] h-fit md:max-w-[360px] flex flex-col gap-[22px]">
          {/* Header */}
          <h2 className={cn(fontHeadline, "text-black-100")}>Setting</h2>

          {/* Radio Button Group */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                Banner and sound
              </span>
              <RadioButton
                selected={notificationSetting === "Banner and sound"}
                onClick={() => setNotificationSetting("Banner and sound")}
                size="large"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                Banner only
              </span>
              <RadioButton
                selected={notificationSetting === "Banner only"}
                onClick={() => setNotificationSetting("Banner only")}
                size="large"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                Sound only
              </span>
              <RadioButton
                selected={notificationSetting === "Sound only"}
                onClick={() => setNotificationSetting("Sound only")}
                size="large"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                None
              </span>
              <RadioButton
                selected={notificationSetting === "None"}
                onClick={() => setNotificationSetting("None")}
                size="large"
              />
            </div>
          </div>

          {/* Divider */}
          <hr className="border-black-10" />

          {/* Toggle Switches */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                Play Repeatedly
              </span>
              <ToggleSwitch
                label=""
                checked={playRepeatedly}
                onChange={() => setPlayRepeatedly(!playRepeatedly)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                Table Notifications
              </span>
              <ToggleSwitch
                label=""
                checked={tableNotifications}
                onChange={() => setTableNotifications(!tableNotifications)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className={cn(fontBodyNormal, "text-black-100")}>
                Order Notifications
              </span>
              <ToggleSwitch
                label=""
                checked={orderNotifications}
                onChange={() => setOrderNotifications(!orderNotifications)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 