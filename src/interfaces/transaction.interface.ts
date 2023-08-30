import { TRANSACTION_TYPE } from './enums';

export interface transaction {
  sku: string;
  type: TRANSACTION_TYPE;
  qty: number;
}
