"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  fontTitle1, 
  fontHeadline, 
  fontBodyNormal, 
  fontCaptionNormal 
} from "@/styles/typography"
import Image from "next/image"
import { IconButton } from "@/components/iconButton"
import { EditIcon, LogoutIcon, MailIcon, PersonAddIcon, SettingAccountBoxIcon } from "@/icons"
import { CustomSelect } from "../select"
import Activities from "./Activities"
import EditProfile from "./EditProfile"

// Mock user data
const mockUser = {
  firstName: "Sarah",
  lastName: "Hermant",
  email: "Saraorderific@gmail.com",
  joinDate: "Mon, 17 Jun 2023",
  role: "Staff",
  profilePicture: null // Use null to test fallback
}

export default function ProfilePage() {
  const [sortOrder, setSortOrder] = useState("Newest First")
  const [showEditProfile, setShowEditProfile] = useState(false)
  
  const handleEditProfile = () => {
    setShowEditProfile(true)
  }
  
  const handleCloseEditProfile = () => {
    setShowEditProfile(false)
  }
  
  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...")
  }
  
  const handleSortChange = (value: string) => {
    setSortOrder(value)
  }

  return (
    <div className="min-h-screen px-4">
      <div className="flex flex-col gap-2">
        {/* Header Section */}
        <div className="flex justify-between items-center w-full pt-7">
          <h1 className={cn(fontTitle1, "text-black-100")}>Profile</h1>
          <div className="flex gap-4 px-2">
            <IconButton 
              icon={EditIcon} 
              onClick={handleEditProfile} 
              text="Edit Profile"
              variant="transparent"
            />
            <IconButton 
              icon={LogoutIcon} 
              onClick={handleLogout} 
              text="Logout"
              variant="transparent"
            />
          </div>
        </div>
        
        {/* Profile Information Grid */}
        <div className="grid grid-cols-12 gap-4 my-2">
          {/* Profile Picture & Name */}
          <div className="col-span-4 md:col-span-6 bg-black-5 rounded-3 p-4">
            <div className="flex items-center gap-4">
              {mockUser.profilePicture ? (
                <Image 
                  src={mockUser.profilePicture} 
                  alt="Profile" 
                  width={48} 
                  height={48} 
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-black-10 flex items-center justify-center text-black-100 text-2xl">
                  {mockUser.firstName.charAt(0)}
                </div>
              )}
              <h2 className={cn(fontHeadline, "font-medium text-black-100")}>
                {`${mockUser.firstName} ${mockUser.lastName}`}
              </h2>
            </div>
          </div>
          
          {/* Email Section */}
          <div className="col-span-4 md:col-span-6 bg-black-5 rounded-3 p-4">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-2">
                <MailIcon className="text-black-60" />
                <span className={cn(fontCaptionNormal, "text-black-60")}>Email</span>
              </div>
              <span className={cn(fontBodyNormal, "text-black-100")}>{mockUser.email}</span>
            </div>
          </div>
          
          {/* Join Date Section */}
          <div className="col-span-2 md:col-span-6 bg-black-5 rounded-3 p-4">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-2">
                <PersonAddIcon className="text-black-60" />
                <span className={cn(fontCaptionNormal, "text-black-60")}>Join at</span>
              </div>
              <span className={cn(fontBodyNormal, "text-black-100")}>{mockUser.joinDate}</span>
            </div>
          </div>
          
          {/* Role Section */}
          <div className="col-span-2 md:col-span-6 bg-black-5 rounded-3 p-4">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-2">
                <SettingAccountBoxIcon className="text-black-60" />
                <span className={cn(fontCaptionNormal, "text-black-60")}>Role</span>
              </div>
              <span className={cn(fontBodyNormal, "text-black-100")}>{mockUser.role}</span>
            </div>
          </div>
        </div>
        
        {/* Main Content Layout */}
        <div className="mb-4 flex flex-row space-x-4">
          {/* Activities List */}
          <div className="w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className={cn(fontHeadline, "text-black-100")}>Activities</h2>
              <CustomSelect 
                options={[{ value: "Newest First", label: "Newest First" }, { value: "Oldest First", label: "Oldest First" }]} 
                defaultValue={{ value: sortOrder, label: sortOrder }}
                onOptionSelect={(option) => handleSortChange(option.value as string)}
                selectWidth="w-48"
                sortByText="Sort by"
              />
            </div>
            <Activities sortOrder={sortOrder} />
          </div>
          
          {/* Settings Section */}
          <div className="w-1/3">
            <div className="flex flex-col gap-4">
              <div className="bg-black-5 rounded-3 p-4">
                <h2 className={cn(fontHeadline, "text-black-100 mb-4")}>Default Page After Login</h2>
                <CustomSelect 
                  options={[{ value: "Dashboard", label: "Dashboard" }, { value: "Orders", label: "Orders" }, { value: "Menu", label: "Menu" }, { value: "Tables", label: "Tables" }, { value: "Profile", label: "Profile" }]} 
                  defaultValue={{ value: "Dashboard", label: "Dashboard" }}
                  onOptionSelect={(option) => handleSortChange(option.value as string)}
                  selectWidth="w-full mb-4"
                  sortByText="Sort by"
                />
                <button className="w-full bg-black-100 text-white-100 py-2 rounded-3">
                  Set as default
                </button>
              </div>
              
              <div className="bg-black-5 rounded-3 p-4">
                <h2 className={cn(fontHeadline, "text-black-100 mb-4")}>Password & Security</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={cn(fontCaptionNormal, "text-black-60 block mb-2")}>
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      className="w-full border border-black-20 rounded-3 p-2"
                      value="••••••"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={cn(fontCaptionNormal, "text-black-60 block mb-2")}>
                      New Password
                    </label>
                    <input 
                      type="password" 
                      className="w-full border border-black-20 rounded-3 p-2"
                      value="••••••"
                      readOnly
                    />
                  </div>
                  <button className="w-full bg-black-100 text-white-100 py-2 rounded-3">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile isOpen={showEditProfile} onClose={handleCloseEditProfile} initialData={mockUser} />
      )}
    </div>
  )
} 