import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const invoiceType = (type: 'expense' | 'income') => {
  return {
    expense: 'Saida',
    income: 'Entrada'
  }[type]
}
