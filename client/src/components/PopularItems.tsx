'use client';

import { cn } from '@/lib/utils';
import { fontTitle2, fontBodyBold, fontBodyNormal } from '@/styles/typography';

// Mock data for popular items
const mockPopularItems = [
  {
    id: 1,
    name: 'Double Chicken Burger + French fries',
    orderCount: 88
  },
  {
    id: 2,
    name: 'Mexican Burger',
    orderCount: 74
  },
  {
    id: 3,
    name: 'Double Cheese',
    orderCount: 56
  },
  {
    id: 4,
    name: 'Double Spicy Bean Burger',
    orderCount: 41
  },
  {
    id: 5,
    name: 'Potato Gems',
    orderCount: 38
  },
  {
    id: 6,
    name: 'Beer',
    orderCount: 32
  }
];

interface PopularItemsProps {
  startDate: string;
  endDate: string;
}

const PopularItems = ({ startDate, endDate }: PopularItemsProps) => {
  return (
    <div className="rounded-3 bg-white-60 p-4 h-full">
      <h2 className={cn(fontTitle2, "text-black-100 mb-4")}>Popular Items</h2>
      <div className="grid grid-cols-2 gap-4">
        {mockPopularItems.map((item) => (
          <div key={item.id} className="bg-white-100 rounded-3 p-4">
            <p className={cn(fontBodyBold, "text-black-100")}>{item.name}</p>
            <div className="flex items-center mt-2">
              <p className={cn(fontBodyNormal, "text-black-60")}>Order:</p>
              <p className={cn(fontBodyBold, "text-black-100 ml-1")}>{item.orderCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems; 