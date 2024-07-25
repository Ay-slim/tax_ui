type ResponseStructure = {
  data: any;
  error: boolean;
  stack: any;
}

export function craftQueryParams(queryParams: {[key: string]: string}) {
  let returnString = '';
  for (let key in queryParams) {
    returnString += `${key}=${queryParams[key]}&`
  }
  const cleanedString = returnString.substring(0, returnString.length - 1);
  return cleanedString;
}

export async function sendFetchRequest(endpoint: string, method: string, body: any) {
  let bodyVal = {};
  let queryParams = '';

  if(['GET', 'DELETE'].includes(method)) {
    queryParams = `?${craftQueryParams(body)}`;
  } else {
    bodyVal = {
      body: JSON.stringify(body),
    }
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}${endpoint}${queryParams}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...bodyVal,
  });
  const res_val = await res.json();
  return res_val;
}

export function formatDate2(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export const yearsArray = (currentYear: number): number[] => {
  const returnArr = [];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    returnArr.push(i);
  }
  return returnArr;
}

export const filingCategoryMap: {[key: string]: string} = {
  regular_income: 'Regular income',
  capital_gain: 'Capital gain (Profit from sale of chargable assets)',
  investment_income: 'Investment income (Rental income, dividends etc)',
};
