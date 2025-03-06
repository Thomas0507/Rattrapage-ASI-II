export enum TransactionType {
    BUY = "BUY",
    SELL = "SELL"
  }
  
  export interface TransactionRequest {
    username: string;
    amount: number;
    transactionType: TransactionType;
    cardId?: string; 
  }
  
  export interface TransactionDto {
    id: string;
    username: string;
    amount: number;
    transactionType: TransactionType;
    cardId?: string;
    createdAt: string;
  }