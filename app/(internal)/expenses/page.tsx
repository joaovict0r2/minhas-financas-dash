"use client";

import { getExpenses } from "@/app/_data/expenses";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatter, invoiceType } from "@/shared/utils";
import { useEffect, useState } from "react";

function Expenses() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filter?: string) => {
    const response = await getExpenses(filter);
    const formattedInvoices = response?.map((invoice: any) => ({
      id: invoice.id,
      type: invoiceType(invoice.type),
      description: invoice.description,
      amount: invoice.amount,
    }));

    setInvoices(formattedInvoices);
  };

  return (
    <div>
      <div className="sticky">
        <section className="mb-3">
          <h1 className="text-2xl font-bold">Meus gastos</h1>
        </section>

        <Tabs
          className="mb-4"
          defaultValue="30days"
          onValueChange={(value) => fetchData(value)}
        >
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="7days">Últimos 7 dias</TabsTrigger>
              <TabsTrigger value="30days">Últimos 30 dias</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      <Card className="max-h-[500px] overflow-auto">
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
              {invoices?.map((invoice: any) => (
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
    </div>
  );
}

export default Expenses;
