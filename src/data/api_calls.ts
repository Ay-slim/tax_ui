import { sendFetchRequest } from "./utils"

export type DashboardData = {
  summary: {
      user_id: string,
      total_taxed_income: number,
      total_deducted_tax: number,
      current_tax_index: number,
      current_tax_bracket: string,
      country: string,
  },
  deductions: {
          _id: string,
          user_id: string,
          description: string,
          income: number,
          year: number,
          tax: number,
          created_at: Date,
      }[],
  years: number[]
}

export const fileIncome = async (fileIncomeReq: {
  user_id: string,
  income: number,
  description: string,
  year: number,
  country_id: string,
}) => {
  return sendFetchRequest('deduction', 'POST', fileIncomeReq);
}

export const fetchDashboardData = async (dashboardReq: {user_id: string, year: number}) => {
  return sendFetchRequest('user/dashboard', 'GET', dashboardReq);
}