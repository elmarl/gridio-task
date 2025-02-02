import React, { FC, Suspense } from "react";
import { useAppSelector } from "../app/store";
import { useQuery } from "@tanstack/react-query";
const Chart = React.lazy(() => import("../components/Chart"));
import {
  fetchCustomerData,
  CustomerDataResponse,
} from "../services/customerService";
import Navbar from "../components/Navbar";

const Dashboard: FC = () => {
  const user = useAppSelector((store) => store.auth.user);
  const { data, error, isLoading } = useQuery<CustomerDataResponse>({
    queryKey: ["customerData"],
    queryFn: fetchCustomerData,
    staleTime: 10 * 60 * 1000, // 10 minutes * 60 seconds * 1000 milliseconds
  });

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full bg-gray-50 p-8">
      <Navbar />

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">
          Welcome {user?.username}! Here you will find all your data.
        </h2>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Customers Joined per Day</h2>
        {isLoading && <p>Loading data...</p>}
        {error && <p className="text-red-500">Error fetching data.</p>}
        {data && (
          <Suspense fallback={<div>Loading chart...</div>}>
            <Chart data={data.data.daily_joins} />
          </Suspense>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
