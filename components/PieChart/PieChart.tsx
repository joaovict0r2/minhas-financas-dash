'use client'

import { formatter } from "@/shared/utils";
import { useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{formatter.format(value)}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const generateColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {    
    const color = `hsl(${(i * 360) / count}, 70%, 50%)`;
    colors.push(color);
  }
  return colors;
};

const Bullet = ({ backgroundColor, size }: any) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size
      }}
    ></div>
  );
};

const CustomizedLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-1 list-none">
      {payload?.map((entry: any, index: any) => (
        <li key={`item-${index}`}>
          <div className="flex items-center">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="ml-2">{entry.value}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

function CategoriesChart({ data }: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const colors = generateColors(data?.length)

  const chartData = data?.map((i: any) => ({
    name: i.category,
    value: i.total_amount
  }));

  function onPieEnter(_: any, index: any) {
    setActiveIndex(index)
  }

  return (
    <ResponsiveContainer width="100%" height={430}>
        <PieChart width={500}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data?.map((_:any, index: any) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>
  )
}

export default CategoriesChart