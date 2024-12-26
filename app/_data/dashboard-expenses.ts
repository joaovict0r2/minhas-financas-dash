import "server-only";
import { cache } from "react";

type LastMonthData = {
  _count: {
    amount: number;
  };
  _sum: {
    amount: number;
  };
  type: "expense" | "income";
};

type CategoriesPercentage = {
  category: string;
  total_amount: number;
  percentage: number;
};

type LastWeekExpenses = {
  type: "expense" | "income";
  expense_date: string;
  amount: number;
  description: string
  id: number
};

type DashboardData = {
  data: {
    lastWeekExpenses: LastWeekExpenses[];
    lastMonthData: LastMonthData[];
    categoriesPercentage: CategoriesPercentage[];
  }
};

export const getDashboardExpenses = cache(async () => {
  // const session = await verifySession();
  // session.user.phone -> deve user essa variavel

  const userIdPhone = "5515996365635";

  try {
    const response = await fetch(`${process.env.API_URL}/expenses/dashboard/${userIdPhone}`);
    const { data }: DashboardData = await response.json();
    
    const thisMonthExpenses =
      data.lastMonthData?.find((d) => d.type === "expense")?._sum?.amount || 0;

    const thisMonthIncome =
      data.lastMonthData?.find((d) => d.type === "income")?._sum?.amount || 0;

    const lastWeekExpensesChart: { expense_date: string; amount: number }[] =
      [];

    for (const expense of data.lastWeekExpenses) {
      if (expense.type !== "expense") {
        continue;
      }

      const currInArray = lastWeekExpensesChart.find(
        (exp) => exp.expense_date === expense.expense_date
      );

      if (!currInArray) {
        lastWeekExpensesChart.push({
          expense_date: expense.expense_date,
          amount: expense.amount,
        });
        continue;
      }

      currInArray.amount += expense.amount;
    }

    return {
      thisMonthExpenses,
      thisMonthIncome,
      lastWeekExpensesChart,
      lastWeekExpenses: data.lastWeekExpenses,
      categoriesPercentage: data.categoriesPercentage
    }
  } catch (error) {
    console.log(error);
  }
});
