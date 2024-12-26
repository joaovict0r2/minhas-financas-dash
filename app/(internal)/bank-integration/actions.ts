"use server"
import { PluggyClient } from 'pluggy-sdk'

const PLUGGY_CLIENT_ID = process.env.PLUGGY_CLIENT_ID!
const PLUGGY_CLIENT_SECRET = process.env.PLUGGY_CLIENT_SECRET!

const client = new PluggyClient({
  clientId: PLUGGY_CLIENT_ID,
  clientSecret: PLUGGY_CLIENT_SECRET
})

export async function createConnectToken(){
  return await client.createConnectToken()
}

export async function getAccounts(itemId: string) {
  return await client.fetchAccounts(itemId)
}

export async function accountsTransactions(itemId: string) {
  const accounts = await getAccounts(itemId)
  console.log(accounts)
  const transactions = []

  for (const account of accounts.results) {
    const accountTransactions = await client.fetchAllTransactions(account.id)
    transactions.push(...accountTransactions)
  }

  return transactions
}