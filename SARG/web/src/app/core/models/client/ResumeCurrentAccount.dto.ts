export interface ResumeCurrentAccountDTO {
  id: number;
  number: number;
  credit: number;
  debit: number;
  balance: number;
  discount: number;
  voucherTypeDescription: string;
  voucherTypeBalance: string;
  date: Date;
  createdAt: Date;
  userUsername: string;
  userFirstName: string;
  notes: string;
  observations: string;
}
