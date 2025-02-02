import { FC } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
  Line,
  TooltipProps,
  Legend,
  Brush,
} from "recharts";

export interface ChartDataItem {
  date: string;
  count: number;
}

interface ChartProps {
  data: ChartDataItem[];
}

const CustomTooltip: FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p>{`Date: ${label}`}</p>
        <p>{`Count: ${payload[0]?.value}`}</p>
        <p>{`Moving Average: ${payload[1]?.value?.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const Chart: FC<ChartProps> = ({ data }) => {
  const enrichedData = data.map((item, index) => {
    const windowData = data.slice(Math.max(index - 6, 0), index + 1);
    const sum = windowData.reduce((acc, cur) => acc + cur.count, 0);
    const avg = sum / windowData.length;
    return { ...item, movingAvg: avg };
  });

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart data={enrichedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#3182CE" name="New Users" />
        <Line
          dataKey="movingAvg"
          name="7-Day Moving Average"
          stroke="#FF5733"
          strokeWidth={2}
          dot={false}
        />
        <Brush
          dataKey="date"
          height={30}
          stroke="#8884d8"
          tickFormatter={formatDate}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
