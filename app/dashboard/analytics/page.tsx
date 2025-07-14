import ProductTable from '@/components/ProductTable';
import RatingChart from '@/components/RatingChart';
import CategoryChart from '@/components/CategoryChart';
import PriceRangeChart from '@/components/PriceRangeChart';
import StockChart from '@/components/StockChart';
// import { getToken } from '@/lib/getverifyToken';
// import { redirect } from 'next/navigation';

export default async function Analytics() {
  // const decode = await getToken();
  // if (!decode) {
  //   redirect("/auth/login");
  // }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RatingChart />
        <CategoryChart />
        <PriceRangeChart />
        <StockChart />
      </div>
    </div>
  );
}