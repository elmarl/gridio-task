import axiosInstance from "../utils/axiosInstance";
import { ChartDataItem } from "../components/Chart";

export interface CustomerDataResponse {
  status: string;
  data: {
    daily_joins: ChartDataItem[];
    start_date: string;
    end_date: string;
  };
}
export const fetchCustomerData = async (): Promise<CustomerDataResponse> => {
  try {
    const res = await axiosInstance.get<CustomerDataResponse>(
      "/c/9371-4923-495b-9217"
    );
    return res.data;
  } catch (error) {
    throw new Error("Error fetching customer data.");
  }
};
