'use client';

import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { cn } from '@/lib/utils';
import SearchInput from '@/components/searchInput';
import { mockOrders } from './mockData';
import { OrderStatuses } from '@/constants/orderStatuses';
import { Tab } from '../tab';
import { CustomSelect } from '../select';
import OrderStatusesStats from './OrderStatusStats';
import { OrderCard } from '@/components/orderCard';
import { fontTitle1 } from '@/styles/typography';
import { OrderStatusStats } from '../orderStatusStats';
const KitchenDisplayPage = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [activeOrderType, setActiveOrderType] = useState('All Order');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest First');
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);

  const orderTypes = ['All Order', 'Table', 'Pickup', 'Delivery', 'Aggregators'];
  
  const sortOptions = [
    { value: 'Newest First', label: 'Newest First' },
    { value: 'Oldest First', label: 'Oldest First' },
    { value: 'Ascending Status', label: 'Ascending Status' },
    { value: 'Descending Status', label: 'Descending Status' },
  ];

  const openOrders = mockOrders.filter(order => 
    order.status !== OrderStatuses.CLOSED && order.status !== OrderStatuses.CANCELED && order.status !== OrderStatuses.REJECTED
  );
  
  const completedOrders = mockOrders.filter(order => 
    order.status === OrderStatuses.CLOSED || order.status === OrderStatuses.CANCELED || order.status === OrderStatuses.REJECTED
  );

  const orderedCount = openOrders.filter(order => order.status === OrderStatuses.ORDERED).length;
  const acceptedCount = openOrders.filter(order => order.status === OrderStatuses.ACCEPTED).length;
  const readyCount = openOrders.filter(order => order.status === OrderStatuses.READY).length;
  const servedCount = openOrders.filter(order => order.status === OrderStatuses.SERVED).length;

  useEffect(() => {
    let orders = activeTab === 'open' ? openOrders : completedOrders;
    
    // Filter by order type
    if (activeOrderType !== 'All Order') {
      orders = orders.filter(order => order.orderType === activeOrderType);
    }
    
    // Filter by search query
    if (searchQuery) {
      orders = orders.filter(order => 
        order.orderNumber.toString().includes(searchQuery) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Sort orders
    switch (sortOption) {
      case 'Newest First':
        orders = [...orders].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        break;
      case 'Oldest First':
        orders = [...orders].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        break;
      case 'Ascending Status':
        orders = [...orders].sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'Descending Status':
        orders = [...orders].sort((a, b) => b.status.localeCompare(a.status));
        break;
      default:
        break;
    }
    
    setFilteredOrders(orders);
  }, [activeTab, activeOrderType, searchQuery, sortOption, openOrders, completedOrders]);

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    768: 2,
    640: 1,
  };

  return (
    <div className="h-screen flex flex-col gap-2 overflow-hidden">
      {/* Header Section */}
      <div className="h-[88px] py-7 px-4 flex items-center justify-between relative">
        {/* Header Section */}
        <header className={cn("w-full py-6 pl-4", "h-[88px]")}>
          <h1 className={cn(fontTitle1, "text-black-100")}>Kitchen Display</h1>
        </header>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 px-6">
          <Tab
            variant="primary"
            isActive={activeTab === 'open'}
            onClick={() => setActiveTab('open')}
            badgeCount={openOrders.length}
          >
            Open
          </Tab>
          <Tab
            variant="primary"
            isActive={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
            badgeCount={completedOrders.length}
          >
            Completed
          </Tab>
        </div>
        
        <div className="w-full md:w-64">
          <SearchInput 
            alwaysOpen={false} 
            query={searchQuery}
            setQuery={setSearchQuery}
          />
        </div>
      </div>
      
      {/* Filters & Sorting Section */}
      <div className="px-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="rounded-full h-fit bg-white-60 flex">
          {orderTypes.map((type) => (
            <Tab
              key={type}
              variant="secondary"
              isActive={activeOrderType === type}
              onClick={() => setActiveOrderType(type)}
            >
              {type}
            </Tab>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {activeTab === 'open' && (
            <OrderStatusStats
              statuses={[
                { number: orderedCount, text: OrderStatuses.ORDERED },
                { number: acceptedCount, text: OrderStatuses.ACCEPTED },
                { number: readyCount, text: OrderStatuses.READY },
                { number: servedCount, text: OrderStatuses.SERVED },
              ]}
              selectedStatus={''}
              onStatusSelect={() => {}}
            />
          )}
          <div className="flex items-center gap-2">
            <CustomSelect
              options={sortOptions}
              onOptionSelect={(option) => setSortOption(option.value as string)} 
              sortByText={'Sort by'}            
            />
          </div>
        </div>
      </div>
      
      {/* Masonry Order Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredOrders.map((order) => (
            <div key={order.id} className="mb-4">
              <OrderCard 
                orderId={order.id.toString()}
                orderNumber={order.orderNumber.toString()}
                paymentStatus={order.paymentStatus || ''}
                table={order.tableName}
                time={order.time}
                status={order.status as OrderStatuses}
                items={order.items.map(item => ({
                  id: item.id.toString(),
                  name: item.name,
                  item_instruction: item.instructions || '',
                  item_quantity: item.quantity,
                  item_status: item.status as OrderStatuses,
                  item_id: item.id.toString(),
                  item_name: item.name,
                  modifiers: item.modifiers?.join(', ') || '',
                  instructions: item.instructions || '',
                  price: 100,
                  main_item_image:[]
                }))}
                editTimeAgo={order.editedTime}
                orderType={order.orderType as any}
                searchTerm=""
                filters={{}}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default KitchenDisplayPage; 