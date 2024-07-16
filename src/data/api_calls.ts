import { sendFetchRequest } from "./utils"

export type DashboardData = {
  summary: {
      user_id: string,
      total_taxed_income: number,
      total_deducted_tax: number,
      current_tax_index: number,
      current_tax_bracket: string,
      country: string,
      currency: string,
      country_id: string,
  },
  deductions: {
          _id: string,
          user_id: string,
          description: string,
          income: number,
          date: string,
          tax: number,
          created_at: Date,
      }[],
  years: number[]
}

export const fileIncome = async (fileIncomeReq: {
  user_id: string,
  income: number,
  description: string,
  date: string,
  country_id: string,
}) => {
  return sendFetchRequest('deduction', 'POST', fileIncomeReq);
}

export const fetchDashboardData = async (reqBody: {user_id: string, year: number}) => {
  return sendFetchRequest('user/dashboard', 'GET', reqBody);
}

export const fetchCountryBrackets = async (reqBody: {_id: string}): Promise<string[]> => {
  return sendFetchRequest('country/brackets', 'GET', reqBody);
}

export const signUp = async (reqBody: {name: string, email: string, password: string, country_id: string, year: number}) => {
  return sendFetchRequest('user', 'POST', reqBody);
}

export const login = async (reqBody: {email: string, password: string}) => {
  return sendFetchRequest('user/login', 'POST', reqBody);
}

export const fetchCountries = async () => {
  return sendFetchRequest('user/countries', 'GET', {});
}