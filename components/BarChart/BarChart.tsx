'use client'

import { Bar, BarChart, CartesianGrid, Customized, Legend, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from "recharts";

type ChartBar = {
  data: any
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { expense_date, amount } = payload[0].payload;
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: '5px', fontSize: '12px' }}>
        <p>Data: {formatDate(expense_date)}</p>
        <p>Valor: {formatCurrency(amount)}</p>
      </div>
    );
  }
  return null;
};

function ExpensesChart ({ data }: ChartBar) {
  // const chartData = [
  //   { expense_date: '2024-12-18', amount: 150.75 },
  // { expense_date: '2024-12-19', amount: 200.5 },
  // { expense_date: '2024-12-20', amount: 75.0 },
  // { expense_date: '2024-12-21', amount: 120.3 },
  // { expense_date: '2024-12-22', amount: 300.0 },
  // ];
  const isDataEmpty = data?.length === 0;

  return(
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} width={100} />
        <XAxis dataKey="expense_date" tickFormatter={formatDate} tick={{ fontSize: 12 }} height={0}/>
        <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} height={0}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '10px' }} />
        <Customized
          component={() => {
            return isDataEmpty ? (
              <Text
                style={{ transform: `translate(50%, 50%)` }}
                x={0}
                y={-20}
                textAnchor="middle"
                verticalAnchor="middle"
              >
                Nenhum dado disponível
              </Text>
            ) : null;
          }}
        />
        <Bar dataKey="amount" fill="#8884d8" barSize={70} name="Valor"/>        
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ExpensesChart 