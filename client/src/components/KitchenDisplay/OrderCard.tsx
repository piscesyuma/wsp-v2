import { cn } from '@/lib/utils';
import { Order, OrderItem } from './mockData';
import { OrderStatuses } from '@/constants/orderStatuses';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case OrderStatuses.ORDERED:
        return 'text-amber-500';
      case OrderStatuses.ACCEPTED:
        return 'text-green-500';
      case OrderStatuses.READY:
        return 'text-blue-500';
      case OrderStatuses.SERVED:
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusDot = (status: string) => {
    return <span className={cn('inline-block w-2 h-2 rounded-full mr-2', {
      'bg-amber-500': status === OrderStatuses.ORDERED,
      'bg-green-500': status === OrderStatuses.ACCEPTED,
      'bg-blue-500': status === OrderStatuses.READY,
      'bg-purple-500': status === OrderStatuses.SERVED,
    })}></span>;
  };

  const getActionButton = () => {
    switch (order.status) {
      case OrderStatuses.ORDERED:
        return (
          <button className="w-full py-3 bg-green-500 text-white rounded-md font-medium">
            Accept All
          </button>
        );
      case OrderStatuses.ACCEPTED:
        return (
          <button className="w-full py-3 bg-blue-500 text-white rounded-md font-medium">
            Ready All
          </button>
        );
      case OrderStatuses.READY:
        return (
          <button className="w-full py-3 bg-purple-500 text-white rounded-md font-medium">
            Serve All
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h3 className="text-lg font-bold">#{order.orderNumber}</h3>
            <span className="ml-4 text-sm text-gray-500">
              {order.orderType === 'Table' ? `Table ${order.tableName}` : order.orderType} | {order.time.split(' ')[1]}
            </span>
          </div>
        </div>
        {order.editedTime && (
          <div className="mt-2 text-sm text-gray-500">
            Edited <span className="text-red-500">{order.editedTime}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {getActionButton()}

        {order.items.map((item, index) => (
          <div key={index} className="mt-4 pb-4 border-b last:border-b-0">
            <div className="flex items-start">
              <div className="w-8 text-center font-medium">{item.quantity}</div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className={cn('ml-auto text-sm', getStatusColor(item.status))}>
                    {getStatusDot(item.status)} {item.status}
                  </span>
                </div>
                {item.modifiers && item.modifiers.map((modifier, idx) => (
                  <div key={idx} className="text-sm text-gray-500 mt-1">{modifier}</div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {order.collectingBill && (
          <div className="mt-4 flex items-center">
            <span className="text-sm">Collecting bill in</span>
            <span className="ml-2 text-sm text-red-500">{order.collectingBillTime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard; 