"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  fontTitle1,
  fontBodyNormal,
  fontHeadline,
  fontCaptionNormal,
} from "@/styles/typography"
import { Tab } from "@/components/tab"
import { IconButton } from "@/components/iconButton"
import { CustomSelect } from "@/components/select"
import SearchInput from "@/components/searchInput"
import  GridIcon  from "@/icons/GridIcon"
import  WindowIcon from "@/icons/WindowIcon"
import  PlusIcon from "@/icons/AddIcon"
import { TableCard } from "./liveCounterTableCard"
import { LiveCounterOrderCard as OrderCard } from "./liveCounterOrderCard"
import { OrderStatuses } from "@/constants/orderStatuses"
import { TableOrder } from "@/types/interfaces/table.interface"

// Define types for our data
type ServiceType = "Tables" | "Delivery" | "Pickup" | "Aggregators"
type LocationType = "All Table" | "Main Hall" | "Terrace" | "River Side" | "See View"
type SortOption = "Table No. Ascending" | "Table No. Descending" | "Occupied First" | "Empty First"
type TableStatus = "Free" | "Ordered" | "Ready"

interface TableData {
  id: string
  name: string
  location: string
  status: TableStatus
  seats: number
  timeAgo?: string
  orders?: TableOrder
}

interface OrderData {
  id: string
  orderNumber: string
  customerName: string
  status: OrderStatuses
  timeAgo: string
  isPaid?: boolean
}

export function LiveCounter() {
  // State for active filters and view options
  const [activeServiceType, setActiveServiceType] = useState<ServiceType>("Tables")
  const [activeLocation, setActiveLocation] = useState<LocationType>("All Table")
  const [sortOption, setSortOption] = useState<SortOption>("Table No. Ascending")
  const [isCompactView, setIsCompactView] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for tables
  const mockTables: TableData[] = [
    { id: "1", name: "A1", location: "River Side", status: "Ordered", seats: 4, timeAgo: "14 min ago", orders: { id: "1", status: "ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "2", name: "A2", location: "River Side", status: "Ordered", seats: 2, timeAgo: "18 min ago", orders: { id: "1", status: "ordered", payment_status: "unpaid", order_count: "1", order_time: "14 min ago" } },
    { id: "3", name: "A3", location: "River Side", status: "Ready", seats: 2, timeAgo: "32 min ago", orders: { id: "1", status: "ready", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "4", name: "A4", location: "River Side", status: "Free", seats: 4 },
    { id: "5", name: "A5", location: "River Side", status: "Ordered", seats: 4, timeAgo: "14 min ago", orders: { id: "1", status: "accepted", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "6", name: "A6", location: "River Side", status: "Free", seats: 6 },
    { id: "7", name: "B1", location: "Terrace", status: "Ordered", seats: 4, timeAgo: "1 hr ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "8", name: "B2", location: "Terrace", status: "Free", seats: 6 },
    { id: "9", name: "B3", location: "Terrace", status: "Free", seats: 4 },
    { id: "10", name: "C1", location: "Mail Hall", status: "Free", seats: 2 },
    { id: "11", name: "C2", location: "Mail Hall", status: "Ordered", seats: 2, timeAgo: "38 min ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "12", name: "C3", location: "Mail Hall", status: "Ordered", seats: 4, timeAgo: "50 min ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "13", name: "C4", location: "Mail Hall", status: "Free", seats: 2 },
    { id: "14", name: "C5", location: "Mail Hall", status: "Ready", seats: 6, timeAgo: "16 min ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "15", name: "D1", location: "Terrace", status: "Free", seats: 4 },
    { id: "16", name: "D2", location: "Terrace", status: "Free", seats: 6 },
    { id: "17", name: "E1", location: "Terrace", status: "Free", seats: 4 },
    { id: "18", name: "E2", location: "Terrace", status: "Ordered", seats: 4, timeAgo: "9 min ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "19", name: "E3", location: "Terrace", status: "Ordered", seats: 4, timeAgo: "1 min ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "20", name: "E4", location: "Terrace", status: "Ordered", seats: 6, timeAgo: "41 min ago", orders: { id: "1", status: "Ordered", payment_status: "paid", order_count: "1", order_time: "14 min ago" } },
    { id: "21", name: "C2", location: "River Side", status: "Free", seats: 4 },
    { id: "22", name: "C3", location: "River Side", status: "Free", seats: 4 },
    { id: "23", name: "C4", location: "River Side", status: "Free", seats: 4 }, 
    { id: "24", name: "C5", location: "River Side", status: "Free", seats: 4 },
    { id: "25", name: "D1", location: "River Side", status: "Free", seats: 4 },
  ]

  // Mock data for orders
  const mockOrders: OrderData[] = [
    { id: "1", orderNumber: "#2014", customerName: "Guest", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "2", orderNumber: "#2011", customerName: "Jerome Bell", status: OrderStatuses.ORDERED, timeAgo: "18 min ago" },
    { id: "3", orderNumber: "#2009", customerName: "Guest", status: OrderStatuses.READY, timeAgo: "32 min ago", isPaid: true },
    { id: "4", orderNumber: "#2001", customerName: "Ralph Edwards", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "5", orderNumber: "#1995", customerName: "Darlene Robertson", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "6", orderNumber: "#1981", customerName: "Dianne Russell", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "7", orderNumber: "#1980", customerName: "Cameron Williamson", status: OrderStatuses.ORDERED, timeAgo: "1 hr ago" },
    { id: "8", orderNumber: "#1978", customerName: "Cody Fisher", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "9", orderNumber: "#1975", customerName: "Guest", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "10", orderNumber: "#1974", customerName: "Guy Hawkins", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    // Duplicated to fill the grid
    { id: "11", orderNumber: "#2009", customerName: "Guest", status: OrderStatuses.READY, timeAgo: "32 min ago", isPaid: true },
    { id: "12", orderNumber: "#2014", customerName: "Guest", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "13", orderNumber: "#2011", customerName: "Jerome Bell", status: OrderStatuses.ORDERED, timeAgo: "18 min ago" },
    { id: "14", orderNumber: "#2001", customerName: "Ralph Edwards", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "15", orderNumber: "#1995", customerName: "Darlene Robertson", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "16", orderNumber: "#1981", customerName: "Dianne Russell", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "17", orderNumber: "#1980", customerName: "Cameron Williamson", status: OrderStatuses.ORDERED, timeAgo: "1 hr ago" },
    { id: "18", orderNumber: "#1978", customerName: "Cody Fisher", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "19", orderNumber: "#1975", customerName: "Guest", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
    { id: "20", orderNumber: "#1974", customerName: "Guy Hawkins", status: OrderStatuses.ORDERED, timeAgo: "14 min ago" },
  ]

  // Filter tables based on active location
  const filteredTables = mockTables.filter(table => {
    if (activeLocation === "All Table") return true
    return table.location === activeLocation
  })

  // Sort tables based on selected sort option
  const sortedTables = [...filteredTables].sort((a, b) => {
    switch (sortOption) {
      case "Table No. Ascending":
        return a.name.localeCompare(b.name)
      case "Table No. Descending":
        return b.name.localeCompare(a.name)
      case "Occupied First":
        return a.status === "Free" ? 1 : b.status === "Free" ? -1 : 0
      case "Empty First":
        return a.status === "Free" ? -1 : b.status === "Free" ? 1 : 0
      default:
        return 0
    }
  })

  // Service type tabs data
  const serviceTypes: { label: ServiceType; count: number }[] = [
    { label: "Tables", count: 16 },
    { label: "Delivery", count: 3 },
    { label: "Pickup", count: 2 },
    { label: "Aggregators", count: 11 },
  ]

  // Location tabs data
  const locationTypes: LocationType[] = [
    "All Table",
    "Main Hall",
    "Terrace",
    "River Side",
    "See View",
  ]

  // Sort options for the dropdown
  const sortOptions: SortOption[] = [
    "Table No. Ascending",
    "Table No. Descending",
    "Occupied First",
    "Empty First",
  ]

  // Determine if we're showing tables or orders
  const showTables = activeServiceType === "Tables"
  
  // Filter for orders tab
  const [orderFilter, setOrderFilter] = useState<"Open Orders" | "Completed">("Open Orders")

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={cn(fontTitle1, "text-text-black-100")}>Live Counter</h1>
        
        {/* Service Type Tabs */}
        <div className="flex gap-4">
          {serviceTypes.map((type) => (
            <Tab
              key={type.label}
              isActive={activeServiceType === type.label}
              onClick={() => setActiveServiceType(type.label)}
              className="px-4"
              badgeCount={type.count}
            >
              {type.label}
            </Tab>
          ))}
        </div>
        
        {/* Search Input */}
        <SearchInput
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </div>

      {/* Filter Section */}
      <div className="flex justify-between items-center pb-4">
        {/* Location Tabs */}
        <div className="rounded-6 bg-white-background-70 px-3">
          {showTables ? (
            <div className="flex bg-white-70 rounded-full">
              {locationTypes.map((location) => (
                <Tab
                  key={location}
                  variant="secondary"
                  isActive={activeLocation === location}
                  onClick={() => setActiveLocation(location)}
                >
                  {location}
                </Tab>
              ))}
            </div>
          ) : (
            <div className="flex bg-white-70 rounded-full">
              <Tab
                variant="secondary"
                isActive={orderFilter === "Open Orders"}
                onClick={() => setOrderFilter("Open Orders")}
              >
                Open Orders
              </Tab>
              <Tab
                variant="secondary"
                isActive={orderFilter === "Completed"}
                onClick={() => setOrderFilter("Completed")}
              >
                Completed
              </Tab>
            </div>
          )}
        </div>
        
        {/* Sort and View Options */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <CustomSelect       
              defaultValue={{ value: sortOption, label: sortOption }}
              options={sortOptions.map(option => ({ label: option, value: option }))}
              menuPosition="left"
              onOptionSelect={(option) => setSortOption(option.value as SortOption)}
              sortByText="Sort by"
              menuWidth="min-w-[250px]"
              truncateLength={14}
              selectWidth="min-w-[170px]"
            />
          </div>
          
          <IconButton
            variant="transparent"
            icon={isCompactView ? WindowIcon : GridIcon }
            onClick={() => setIsCompactView(!isCompactView)}
          />
        </div>
      </div>

      {/* Table/Order Container */}
      <div className={cn(
        "grid gap-4 overflow-auto flex-grow",
        isCompactView 
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" 
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      )}>
        {showTables ? (
          // Render table cards
          sortedTables.map((table) => (
            <TableCard
              key={table.id}
              id={table.id}
              brand_id="default-brand-id"
              user_id="default-user-id"
              name={table.name}    
              section_name={table.location}
              no_of_capacity={table.seats}
              table_order={table.orders}
              isSmallIconView={isCompactView}
            />
          ))
        ) : (
          // Render order cards
          mockOrders.map((order) => (
            <OrderCard
              key={order.id}
              order_number={order.orderNumber}      
              customer_name={order.customerName}
              order_status={order.status}
              time={order.timeAgo}
              payment_status={order.isPaid ? "paid" : "unpaid"}
              isSmallIconView={isCompactView}
            />
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <IconButton
          variant="primary"
          icon={PlusIcon }
          className="rounded-full w-12 h-12 shadow-lg"
          onClick={() => {}}
        />
      </div>
    </div>
  )
} 