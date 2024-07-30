type TaxesAndDeductions = {
  description: string;
  amount: number;
  reason: string;
};

export type DashboardData = {
  summary: {
      user_id: string,
      total_taxed_income: number,
      total_income: number,
      total_deducted_tax: number,
      current_tax_index: number,
      current_tax_bracket: string,
      country: string,
      currency: string,
      country_id: string,
      taxes: TaxesAndDeductions[],
      deductions: TaxesAndDeductions[],
  },
  filings: {
          _id: string,
          user_id: string,
          description: string,
          amount: number,
          category: string,
          date: string,
          created_at: Date,
      }[],
  years: number[]
}

export type ContributionsUnit = {
  name: string;
  percentage: number;
}

export type ContributionsType = {
  [key: string]: ContributionsUnit;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type MoreInfoTableDataSource = {
  key: string;
  amount: string;
  reason: string;
  description: string;
}

export type MoreInfoTableColumns = {
  title: string;
  dataIndex: string;
  key: string;
}