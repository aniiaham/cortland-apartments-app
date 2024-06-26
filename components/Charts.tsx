"use client";

import AreaChartPlot from "./AreaChartPlot";
import BarChartPlot from "./BarChartPlot";

const Charts = ({ apt_number }: { apt_number: number }) => {
  return (
    <section className="flex my-4 pr-4 gap-8">
      <div className="w-full h-[300px] bg-none rounded flex flex-row">
        <AreaChartPlot apt_number={apt_number} />
        <BarChartPlot apt_number={apt_number} />
      </div>
    </section>
  );
};

export default Charts;
