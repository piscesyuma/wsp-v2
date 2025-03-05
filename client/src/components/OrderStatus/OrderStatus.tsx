"use client"

import { useEffect, useRef, useState } from "react"
import { useFullscreen } from "@/providers/FullscreenProvider"
import { cn } from "@/lib/utils"
import { fontHeadline, fontTitle1, fontTitle2 } from "@/styles/typography"
import { FullscreenIcon } from "@/icons"
import { IconButton } from "../iconButton"
import { mockBrand, mockOrders } from "./mockData"

export default function OrderStatus() {
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  const [currentTime, setCurrentTime] = useState<string>("")
  const [showFullscreenButton, setShowFullscreenButton] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [preparingOrders, setPreparingOrders] = useState<any[]>([])
  const [readyOrders, setReadyOrders] = useState<any[]>([])
  const preparingRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      // Simulate API loading
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setPreparingOrders(mockOrders.preparing)
      setReadyOrders(mockOrders.ready)
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Handle fullscreen button visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setShowFullscreenButton(true)
      
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
      
      mouseTimeoutRef.current = setTimeout(() => {
        if (isFullscreen) {
          setShowFullscreenButton(false)
        }
      }, 5000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
    }
  }, [isFullscreen])

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = (ref: React.RefObject<HTMLDivElement>) => {
      if (!ref.current) return
      
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      
      if (scrollTop < scrollHeight - clientHeight) {
        ref.current.scrollTop += 1
      } else {
        ref.current.scrollTop = 0
      }
    }

    const startAutoScroll = () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
      
      timeoutRef.current = setInterval(() => {
        if (preparingRef.current && preparingRef.current.scrollHeight > preparingRef.current.clientHeight) {
          autoScroll(preparingRef)
        }
        
        if (readyRef.current && readyRef.current.scrollHeight > readyRef.current.clientHeight) {
          autoScroll(readyRef)
        }
      }, 50)
    }

    if (!isLoading) {
      startAutoScroll()
    }

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className={cn(fontTitle1, "text-black-100")}>Order Status</h1>
        {(!isFullscreen || showFullscreenButton) && (
          <IconButton
            icon={FullscreenIcon}
            iconSize="24"
            size="large"
            variant="transparent"
            onClick={toggleFullscreen}
            aria-label="Enter fullscreen"
            text="FullScreen"
          />
        )}
      </div>

      {/* Brand and Time */}
      <div className="mb-4 flex items-center justify-between rounded-5 bg-black-5 p-4">
        <div className="flex items-center">
          {mockBrand.logo ? (
            <img 
              src={mockBrand.logo} 
              alt={mockBrand.name} 
              className="mr-3 h-15 w-15 rounded-2"
            />
          ) : (
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white-100">
              {mockBrand.name.charAt(0)}
            </div>
          )}
          <span className={cn(fontHeadline, "text-black-100")}>{mockBrand.name}</span>
        </div>
        <span className={cn(fontTitle1, "text-black-100")}>{currentTime}</span>
      </div>

      {/* Order Lists */}
      <div className="flex flex-grow space-x-4">
        {/* Preparing Orders */}
        <div className={cn(
          "flex flex-col rounded-5 bg-white-100 w-full md:w-1/2 lg:w-[calc(100%-380px)]",
          isFullscreen ? "h-[calc(100vh-150px)]" : "h-[calc(100vh-225px)]"
        )}>
          <div className="flex justify-center p-4">
            <h2 className={cn(fontTitle1, "w-fit rounded-5 text-black-100")}>Preparing</h2>
          </div>
          <div 
            ref={preparingRef} 
            className="flex flex-wrap justify-center gap-2 overflow-auto p-4"
          >
            {preparingOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex w-[106px] h-[64px] items-center justify-center rounded-3 bg-black-10"
              >
                <span className={cn(fontTitle2, "text-black-100")}>{order.orderNumber}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ready Orders */}
        <div className={cn(
          "flex flex-col rounded-5 bg-white-100 w-full md:w-1/2 lg:w-[380px]",
          isFullscreen ? "h-[calc(100vh-150px)]" : "h-[calc(100vh-225px)]"
        )}>
          <div className="flex justify-center p-4">
            <h2 className={cn(fontTitle1, "w-fit rounded-5 text-black-100")}>Ready</h2>
          </div>
          <div 
            ref={readyRef} 
            className="flex flex-wrap justify-center gap-2 overflow-auto p-4"
          >
            {readyOrders.map((order, index) => (
              <div
                key={order.id}
                className={cn(
                  "flex items-center justify-center rounded-3",
                  index === 0 ? "w-full h-[112px]" : "w-[115px] h-[64px]",
                  "bg-status-accepted text-white-100"
                )}
              >
                <span className={cn(fontTitle2)}>{order.orderNumber}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 