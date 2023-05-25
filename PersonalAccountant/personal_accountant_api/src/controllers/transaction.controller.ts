import { Transaction } from "../models/Transaction.entity";
import { dataSourceConnection } from "../server";

export class TransactionController {
    readonly EXPENSE_DAILY_ID = 1;
    readonly EXPENSE_EXTRAORDINARY_ID = 2;
    readonly EXPENSE_FIXED_ID = 3;


    async getExpenses(): Promise<{ daily: Transaction[], extraordinary: Transaction[], fixed: Transaction[] }> {
        const repo = dataSourceConnection.getRepository(Transaction)

        const daily = await repo.find({ where: { status: 'A', transactionTypeId: this.EXPENSE_DAILY_ID } })
        const extraordinary = await repo.find({ where: { status: 'A', transactionTypeId: this.EXPENSE_EXTRAORDINARY_ID } })
        const fixed = await repo.find({ where: { status: 'A', transactionTypeId: this.EXPENSE_FIXED_ID } })

        return { daily, extraordinary, fixed }
    }

}