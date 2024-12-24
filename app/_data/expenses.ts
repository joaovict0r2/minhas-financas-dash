import "server-only";
import { cache } from "react";
import { verifySession } from "../_lib/session";

type Expenses = {
  startDate: string;
  endDate: string;
};

export const getExpenses = cache(async (params?: Expenses) => {
  // const session = await verifySession();
  // session.user.phone -> deve user essa variavel

  const userIdPhone = "5515996365635";

  const start_date_query = params?.startDate
    ? `?startDate=${params.startDate}`
    : "";

  const end_date_query = params?.endDate 
    ? `&endDate=${params.endDate}`
    : "";

  try {
    const response = await fetch(
      `${process.env.API_URL}/expenses/${userIdPhone}` +
        start_date_query +
        end_date_query,
      {
        method: "GET",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
});
