import fetchApartmentHistory from "@/app/fetchApartmentHistory";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const BarChartPlot = ({ apt_number }: { apt_number: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["history", apt_number],
    queryFn: () => fetchApartmentHistory({ apt_number }),
  });
  console.log(apt_number);
  // console.log(data);
  if (!data) {
    return <div>No data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const formatted_data = useMemo(() => {
    return data.map((v, index) => {
      const prevIndex = index - 1;
      if (index === 0) {
        return {
          ...v,
          fill: "#4CBB17",
        };
      } else {
        return {
          ...v,
          fill: data[prevIndex].Price >= v.Price ? "#4CBB17" : "#FF5733",
        };
      }
    });
  }, [data]);

  console.log(formatted_data);

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={formatted_data}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Price" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default BarChartPlot;
