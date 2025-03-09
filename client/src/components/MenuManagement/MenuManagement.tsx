"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  fontTitle1,
  fontBodyNormal,
  fontCaptionBold,
  fontCaptionNormal,
} from "@/styles/typography"
import { Tab } from "@/components/tab"
import SearchInput from "@/components/searchInput"
import ToggleSwitch from "@/components/toggleSwitch"
import { CategoryManagementSection } from "../categorySection"
import { MenuSection } from "../menuSection"
import { MenuItem } from "../menuItem"

// Define types for our data
type ServiceType = "All Services" | "Dine-in" | "Delivery" | "Pickup"
type MenuSection = "Breakfast" | "Lunch" | "Dinner"
type Category = "Kebab" | "Burgers" | "Pizza" | "Soups" | "Salads" | "Pasta" | "Desserts" | "Sandwiches" | "Drinks" | "Seafood"

interface MenuItem {
  id: string
  name: string
  price: number
  isActive: boolean
  category: Category
}

export function MenuManagement() {
  // State for active filters and search
  const [activeServiceType, setActiveServiceType] = useState<ServiceType>("All Services")
  const [activeMenuSection, setActiveMenuSection] = useState<MenuSection>("Breakfast")
  const [activeCategory, setActiveCategory] = useState<Category>("Burgers")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryActive, setCategoryActive] = useState(true)
  
  // State for menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(generateMenuItems())

  // Service type tabs data
  const serviceTypes: { label: ServiceType; count: number }[] = [
    { label: "All Services", count: 16 },
    { label: "Dine-in", count: 3 },
    { label: "Delivery", count: 2 },
    { label: "Pickup", count: 11 },
  ]

  // Menu sections
  const menuSections: MenuSection[] = ["Breakfast", "Lunch", "Dinner"]

  // Categories with counts
  const categories: { label: Category; count: number }[] = [
    { label: "Kebab", count: 16 },
    { label: "Burgers", count: 12 },
    { label: "Pizza", count: 8 },
    { label: "Soups", count: 7 },
    { label: "Salads", count: 11 },
    { label: "Pasta", count: 3 },
    { label: "Desserts", count: 4 },
    { label: "Sandwiches", count: 12 },
    { label: "Drinks", count: 5 },
    { label: "Seafood", count: 5 },
  ]

  // Toggle menu item active state
  const toggleMenuItemActive = (id: string) => {
    setMenuItems(
      menuItems.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    )
  }

  // Toggle category active state
  const toggleCategoryActive = () => {
    setCategoryActive(!categoryActive)
    
    // Update all menu items in this category
    setMenuItems(
      menuItems.map(item => 
        item.category === activeCategory ? { ...item, isActive: !categoryActive } : item
      )
    )
  }

  // Filter menu items based on active category
  const filteredMenuItems = menuItems.filter(item => item.category === activeCategory)

  return (
    <div className="mx-6 flex flex-col h-full">
      {/* Header Section */}
      <header className="h-24 flex items-center justify-between">
        <h1 className={cn(fontTitle1, "text-black-100")}>Menu Management</h1>
        
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
      </header>

      {/* Filter Section */}
      <div className="mb-4">
        {/* Menu Sections */}
        <div className="flex min-h-[64px] w-[90%] gap-2 scrollbar-hide mx-8">
          {menuSections.map((section) => (
            <MenuItem
              key={`menu-${section}`}
              aria-selected={activeMenuSection === section}
              onClick={() => setActiveMenuSection(section)}
              isActive={activeMenuSection === section}
              className="min-w-[160px]"
            >
              <p className="line-clamp-2 max-h-[3rem] overflow-hidden break-words">
                {section}
              </p>
            </MenuItem>
          ))}
          
        </div>

        {/* Categories */}
        <div className="flex min-h-[80px] w-full items-center gap-4 overflow-x-auto rounded-5 bg-black-10 p-4 shadow-inset-right scrollbar-hide">
          {categories.map((category) => (
            <Tab
              key={category.label}
              isActive={activeCategory === category.label}
              onClick={() => setActiveCategory(category.label)}
              badgeCount={category.count}
              className="whitespace-nowrap"
            >
              {category.label}
            </Tab>
          ))}
        </div>
      </div>

      {/* Category Header */}
      <div className="rounded-3 bg-white-70 backdrop-blur-sm p-4 flex justify-between items-center mb-4">
        <div>
          <span className={cn(fontCaptionBold, "text-black-100")}>
            {`Whole "${activeCategory}" Category`}
          </span>
          <span className={cn(fontCaptionNormal, "text-black-60 ml-2")}>
            {filteredMenuItems.length} Items
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <ToggleSwitch 
            label={categoryActive ? "Active" : "Inactive"}
            checked={categoryActive} 
            onChange={toggleCategoryActive} 
          />
          <span className={cn(fontCaptionNormal, "text-black-100")}>
            {categoryActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto flex-grow">
        {filteredMenuItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white-100 rounded-3 p-4 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <span className={cn(fontCaptionBold, "text-black-100")}>
                {item.name}
              </span>
              <span className={cn(fontCaptionNormal, "text-black-60")}>
                ${item.price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <ToggleSwitch 
                label={item.isActive ? "Active" : "Inactive"}
                checked={item.isActive} 
                onChange={() => toggleMenuItemActive(item.id)} 
              />
              <span className={cn(fontCaptionNormal, "text-black-100")}>
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to generate mock menu items
function generateMenuItems(): MenuItem[] {
  const items: MenuItem[] = []
  const categories: Category[] = ["Kebab", "Burgers", "Pizza", "Soups", "Salads", "Pasta", "Desserts", "Sandwiches", "Drinks", "Seafood"]
  
  // Generate 40 items
  for (let i = 1; i <= 40; i++) {
    const category = i <= 24 ? "Burgers" : categories[Math.floor(Math.random() * categories.length)]
    
    items.push({
      id: `item-${i}`,
      name: i <= 24 ? `Double Cheese` : `Menu Item ${i}`,
      price: 22.50,
      isActive: Math.random() > 0.2, // 80% chance of being active
      category
    })
  }
  
  return items
} 