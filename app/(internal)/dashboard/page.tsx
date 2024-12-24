import { getDashboardExpenses } from "@/app/_data/dashboard-expenses";
import ExpensesChart from "@/components/BarChart/BarChart";
import CategoriesChart from "@/components/PieChart/PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatter, invoiceType } from "@/shared/utils";
import { DollarSign, MoveDownRight, MoveUpRight } from "lucide-react";

async function Dashboard() {
  const response = await getDashboardExpenses();
  console.log(response);

  const thisMonthExpenses = response?.thisMonthExpenses || 0;
  const thisMonthIncome = response?.thisMonthIncome || 0;
  const monthTotalAmount = thisMonthIncome - thisMonthExpenses;

  const invoices = response?.lastWeekExpenses.map((expense) => ({
    id: expense.id,
    type: invoiceType(expense.type),
    description: expense.description,
    amount: expense.amount,
  }));

  return (
    <div>
      <section className="mb-3 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gastos desse mês
            </CardTitle>
            <MoveDownRight size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatter.format(thisMonthExpenses)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Entradas desse mês
            </CardTitle>
            <MoveUpRight size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {formatter.format(thisMonthIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo mensal</CardTitle>
            <DollarSign size={16} />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                monthTotalAmount > 0 ? "text-green-700" : "text-red-600"
              } `}
            >
              {formatter.format(monthTotalAmount)}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">
              Últimos registros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices?.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.type}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{formatter.format(invoice.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="mt-5 w-full flex flex-col gap-5 md:flex-row">
        <Card className="flex-1 h-[500px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">
              Gastos na última semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-[730px] m-auto">
              <ExpensesChart data={response?.lastWeekExpensesChart}/>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 h-[500px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium">
              Gastos por categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full max-w-[730px] m-auto">
              <CategoriesChart data={response?.categoriesPercentage}/>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
