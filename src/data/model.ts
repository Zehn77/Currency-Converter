export interface Currency {
  id: number;
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

export interface ResponseData {
  [code: string]: number;
}

export type StoredItem = {
  id: number;
  amount: string;
  amountName: string;
  resultAmount: string;
  resultAmountName: string;
  date: string;
};