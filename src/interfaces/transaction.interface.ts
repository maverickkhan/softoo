import { TRANSACTION_TYPE } from './enums';

export interface Transaction {
  sku: string;
  type: TRANSACTION_TYPE;
  qty: number;
}
