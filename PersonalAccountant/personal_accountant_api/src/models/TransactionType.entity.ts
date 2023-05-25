import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'transactions_types' })
export class TransactionType {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'translate' })
    translate: string;

    @Column({ name: 'is_expense' })
    isExpense: boolean;

    @Column({ name: 'is_income' })
    isIncome: boolean;

    @Column({ name: 'is_transfer' })
    isTransfer: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    
}