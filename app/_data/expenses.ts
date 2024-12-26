'use server'

import { cache } from "react";
// import { verifySession } from "../_lib/session";

export const getExpenses = cache(async (value?: any ) => {
  // const session = await verifySession();
  // session.user.phone -> deve user essa variavel
  
  const userIdPhone = "5515996365635";

  const sevenDays = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDays = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const endDate = new Date().toISOString();

  const start_date_query = `?startDate=${value === '7days' ? sevenDays : thirtyDays}`

  const end_date_query = `&endDate=${endDate}`

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
