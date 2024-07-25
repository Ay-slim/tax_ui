import { ContributionsUnit } from "./types";
import { sendFetchRequest } from "./utils"

export const fileIncome = async (fileIncomeReq: {
  user_id: string,
  amount: number,
  description: string,
  date: string,
  country_id: string,
  category: string,
  contributions: string[],
}) => {
  return sendFetchRequest('filing', 'POST', fileIncomeReq);
}

export const fetchDashboardData = async (reqBody: {user_id: string, year: number}) => {
  return sendFetchRequest('user/dashboard', 'GET', reqBody);
}

export const fetchCountryBrackets = async (reqBody: {_id: string}): Promise<string[]> => {
  return sendFetchRequest('country/brackets', 'GET', reqBody);
}

export const signUp = async (reqBody: {
  name: string,
  email: string,
  password: string,
  country_id: string,
  year: number,
  contributions: ContributionsUnit[]
}) => {
  return sendFetchRequest('user', 'POST', reqBody);
}

export const login = async (reqBody: {email: string, password: string}) => {
  return sendFetchRequest('user/login', 'POST', reqBody);
}

export const fetchCountries = async () => {
  return sendFetchRequest('user/countries', 'GET', {});
}

export const fetchUserContributions = async (reqBody: {user_id: string, country_id: string}): Promise<string[]> => {
  return sendFetchRequest('user/contributions', 'GET', reqBody);
}