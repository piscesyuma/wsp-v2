"use client"

import { cn } from "@/lib/utils"
import { fontBodyNormal, fontCaptionNormal } from "@/styles/typography"
import { useEffect, useState } from "react"

// Mock activity data
const mockActivities = [
  { id: 1, summary: "#202 order, \"mushroom burger\" was \"accepted\".", date: "6 Jan 2024", time: "11:32" },
  { id: 2, summary: "#588 order, \"Soda\" was Ready.", date: "6 Jan 2024", time: "11:11" },
  { id: 3, summary: "#164 order for \"Table A101\" Placed.", date: "6 Jan 2024", time: "10:59" },
  { id: 4, summary: "#202 order was Completed.", date: "5 Jan 2024", time: "18:36" },
  { id: 5, summary: "#202 order, \"mushroom burger\" was \"Served\".", date: "5 Jan 2024", time: "18:07" },
  { id: 6, summary: "#202 order, \"mushroom burger\" was \"Served\".", date: "5 Jan 2024", time: "17:55" },
  { id: 7, summary: "#202 order was Completed.", date: "5 Jan 2024", time: "17:17" },
  { id: 8, summary: "#164 order for \"Table A101\" Placed.", date: "5 Jan 2024", time: "17:01" },
  { id: 9, summary: "#164 order for \"Table A101\" Placed.", date: "5 Jan 2024", time: "16:24" },
  { id: 10, summary: "#202 order was Completed.", date: "5 Jan 2024", time: "16:20" },
  { id: 11, summary: "#588 order, \"Soda\" was Ready.", date: "5 Jan 2024", time: "16:10" },
  { id: 12, summary: "#164 order for \"Table A101\" Placed.", date: "4 Jan 2024", time: "15:45" },
]

interface ActivitiesProps {
  sortOrder: string
}

export default function Activities({ sortOrder }: ActivitiesProps) {
  const [activities, setActivities] = useState(mockActivities)
  
  useEffect(() => {
    // Sort activities based on sortOrder
    const sortedActivities = [...mockActivities].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime()
      const dateB = new Date(`${b.date} ${b.time}`).getTime()
      
      return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB
    })
    
    setActivities(sortedActivities)
  }, [sortOrder])
  
  return (
    <div className="bg-black-5 rounded-3 p-4 max-h-[600px] overflow-y-auto masonry-scroll-container">
      <table className="w-full">
        <thead className="border-b border-black-20">
          <tr>
            <th className={cn(fontCaptionNormal, "text-black-60 text-left pb-2 w-3/4")}>Summary Activity</th>
            <th className={cn(fontCaptionNormal, "text-black-60 text-left pb-2")}>Date</th>
            <th className={cn(fontCaptionNormal, "text-black-60 text-left pb-2")}>Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-b border-black-10 last:border-0">
              <td className={cn(fontBodyNormal, "text-black-100 py-4")}>{activity.summary}</td>
              <td className={cn(fontBodyNormal, "text-black-60 py-4")}>{activity.date}</td>
              <td className={cn(fontBodyNormal, "text-black-60 py-4")}>{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 