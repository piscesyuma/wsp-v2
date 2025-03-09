"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/badge";
import SearchInput from "@/components/searchInput";
import OtpList from "@/components/otpList";
import RiderDetails from "@/components/riderDetails";
import ConfirmationDialog from "@/components/confirmationDialog";
import { OtpNotification } from "@/types/interfaces/otp-notifications.interface";
import { fontBodyBold, fontBodyNormal, fontHeadline, fontTitle1 } from "@/styles/typography";

// Mock data for OTP confirmations that matches the OtpNotification interface
const mockOtpData: OtpNotification[] = [
  {
    id: 1,
    account_id: 1001,
    interface_id: "web",
    service_provider_id: 101,
    otp_mode_id: 1,
    name: "Nasser Alsubai",
    picture: {
      cid: "nasser-profile",
      type: "image/jpeg",
      name: "NA"
    },
    phone_number: "+1234567890",
    email: "nasser@example.com",
    otp_code: "674951",
    status: "sent",
    created_at: "2024-02-09T10:24:00Z",
    expiry_at: "2024-02-09T10:54:00Z",
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0",
    entity_1_id: "rider_1",
    entity_1_type: "rider",
    entity_2_id: "order_1",
    entity_2_type: "order",
    field_1_key: "previous_order_amount",
    field_1_value: "86.60",
    field_2_key: "previous_order_id",
    field_2_value: "ORD123456",
    field_3_key: "previous_brand_id",
    field_3_value: "BRD001",
    field_4_key: "current_order_id",
    field_4_value: "ORD123457",
    field_5_key: "cash_status",
    field_5_value: "collected",
    field_6_key: "brand_order_number",
    field_6_value: "BON123456",
    previous_brand_currency: "$"
  },
  {
    id: 2,
    account_id: 1002,
    interface_id: "web",
    service_provider_id: 102,
    otp_mode_id: 1,
    name: "Nguyen, Shane",
    picture: {
      cid: "shane-profile",
      type: "image/jpeg",
      name: "SN"
    },
    phone_number: "+1234567891",
    email: "shane@example.com",
    otp_code: "123456",
    status: "sent",
    created_at: "2024-02-09T10:20:00Z",
    expiry_at: "2024-02-09T10:50:00Z",
    ip_address: "192.168.1.2",
    user_agent: "Mozilla/5.0",
    entity_1_id: "rider_2",
    entity_1_type: "rider",
    entity_2_id: "order_2",
    entity_2_type: "order",
    field_1_key: "previous_order_amount",
    field_1_value: "45.20",
    field_2_key: "previous_order_id",
    field_2_value: "ORD123457",
    field_3_key: "previous_brand_id",
    field_3_value: "BRD002",
    field_4_key: "current_order_id",
    field_4_value: "ORD123458",
    field_5_key: "cash_status",
    field_5_value: "collected",
    field_6_key: "brand_order_number",
    field_6_value: "BON123457",
    previous_brand_currency: "$"
  },
  // Add more mock data entries following the same pattern...
  {
    id: 3,
    account_id: 1003,
    interface_id: "web",
    service_provider_id: 103,
    otp_mode_id: 1,
    name: "Flores, Juanita",
    picture: {
      cid: "juanita-profile",
      type: "image/jpeg",
      name: "JF"
    },
    phone_number: "+1234567892",
    email: "juanita@example.com",
    otp_code: "987654",
    status: "sent",
    created_at: "2024-02-09T10:04:00Z",
    expiry_at: "2024-02-09T10:34:00Z",
    ip_address: "192.168.1.3",
    user_agent: "Mozilla/5.0",
    entity_1_id: "rider_3",
    entity_1_type: "rider",
    entity_2_id: "order_3",
    entity_2_type: "order",
    field_1_key: "previous_order_amount",
    field_1_value: "32.75",
    field_2_key: "previous_order_id",
    field_2_value: "ORD123458",
    field_3_key: "previous_brand_id",
    field_3_value: "BRD003",
    field_4_key: "current_order_id",
    field_4_value: "ORD123459",
    field_5_key: "cash_status",
    field_5_value: "collected",
    field_6_key: "brand_order_number",
    field_6_value: "BON123458",
    previous_brand_currency: "$"
  }
];

export default function OtpConfirmationPage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRider, setSelectedRider] = useState<OtpNotification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<OtpNotification[]>(mockOtpData);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Filter data based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(mockOtpData);
    } else {
      const filtered = mockOtpData.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.otp_code.includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  // Handle search input focus change
  const handleSearchFocus = (focused: boolean) => {
    setSearchFocused(focused);
  };

  // Handle rider selection
  const handleRiderSelect = (rider: OtpNotification) => {
    setSelectedRider(rider);
  };

  // Handle confirmation dialog
  const handleConfirmChange = () => {
    // Mock success - just close the dialog
    setIsDialogOpen(false);
    // In a real app, you would update the status or call an API here
  };

  // Handle cash transfer button click
  const handleCashTransferClick = () => {
    setIsDialogOpen(true);
  };

  // If there are no OTP confirmations at all
  if (mockOtpData.length === 0) {
    return (
      <div className="flex flex-col h-screen px-4 mb-4">
        <h1 className={cn(fontTitle1, "py-7")}>OTP Confirmation</h1>
        <div className="flex items-center justify-center h-full">
          <p className={cn(fontBodyNormal, "text-black-100 rounded-5 bg-white-60 px-2")}>
            There is no OTP confirmation yet!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen px-4 mb-4">
      <h1 className={cn(fontTitle1, "py-7")}>OTP Confirmation</h1>
      
      <div className="rounded-5 border border-black-10 bg-white-60 overflow-hidden flex flex-1">
        {/* Left Section */}
        <div className="flex flex-col h-full border-r border-black-10 bg-transparent" style={{ maxWidth: "320px" }}>
          {/* Header Row */}
          <div className="flex items-center p-4 justify-between">
            {!searchFocused && (
              <div className="flex items-center">
                <span className={cn(fontHeadline, "font-medium text-black-100 mr-2")}>Pending</span>
                <Badge variant="black" size="small" count={filteredData.filter(item => item.status === "sent").length} />
              </div>
            )}
            <div className={searchFocused ? "w-full" : "ml-auto"}>
              <SearchInput 
                onFocusChange={handleSearchFocus}
                query={searchQuery}
                setQuery={(e) => setSearchQuery(e)}
              />
            </div>
          </div>
          
          {/* OTP List */}
          <div className="flex-1 overflow-y-auto">
            <OtpList 
              otpNotifications={filteredData}
              selectedRiderId={selectedRider?.id ?? null}
              handleSelectRider={handleRiderSelect}
              isFetchingNextPage={false}
              bottomRef={bottomRef}
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center bg-transparent">
          {filteredData.length === 0 ? (
            <p className={cn(fontBodyNormal, "text-black-100 rounded-5 bg-white-100 px-2")}>
              No OTP confirmations found for the search!
            </p>
          ) : selectedRider ? (
            <RiderDetails   
              selectedRider={selectedRider}
              setSelectedRiderId={() => {}}
              setIsDialogOpen={setIsDialogOpen}
              isPending={selectedRider?.status === "sent"}
            />
          ) : (
            <p className={cn(fontBodyNormal, "text-black-100 rounded-5 bg-white-100 px-2")}>
              Select a rider to see info
            </p>
          )}
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {selectedRider && (
        <ConfirmationDialog
          title="Collect Confirmation"
          description={
            <>
              Do you confirm the receipt of the sum of{" "}
              <span className={cn(fontBodyBold, "text-black-100")}>
                {selectedRider.previous_brand_currency}
                {selectedRider.field_1_value}
              </span>{" "}
              from{" "}
              <span className={cn(fontBodyBold, "text-black-100")}>
                {selectedRider.name}
              </span>
              ?
            </>
          }
          confirmText="Confirm"
          isOpen={isDialogOpen}
          onCancel={() => setIsDialogOpen(false)}
          onConfirm={() => handleConfirmChange()}
        />
      )}
      <div ref={bottomRef} />
    </div>
  );
} 