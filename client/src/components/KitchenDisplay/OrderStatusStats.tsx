import { cn } from '@/lib/utils';

interface OrderStatusStatsProps {
  ordered: number;
  accepted: number;
  ready: number;
  served: number;
}

const OrderStatusStats = ({ ordered, accepted, ready, served }: OrderStatusStatsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center px-3 py-2 bg-white rounded-md">
        <span className="text-amber-500 font-bold">{ordered}</span>
        <span className="text-xs text-gray-500">Ordered</span>
      </div>
      <div className="flex flex-col items-center px-3 py-2 bg-white rounded-md">
        <span className="text-green-500 font-bold">{accepted}</span>
        <span className="text-xs text-gray-500">Accepted</span>
      </div>
      <div className="flex flex-col items-center px-3 py-2 bg-white rounded-md">
        <span className="text-blue-500 font-bold">{ready}</span>
        <span className="text-xs text-gray-500">Ready</span>
      </div>
      <div className="flex flex-col items-center px-3 py-2 bg-white rounded-md">
        <span className="text-purple-500 font-bold">{served}</span>
        <span className="text-xs text-gray-500">Served</span>
      </div>
    </div>
  );
};

export default OrderStatusStats; 