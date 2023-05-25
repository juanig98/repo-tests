import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import { Origin } from "./Origin.entity";
import { TransactionType } from "./TransactionType.entity";
import { User } from "./User.entity";

@Entity({ name: 'transactions' })
export class Transaction {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'date' })
    date: Date;

    @Column({ name: 'amount', scale: 18, precision: 2 })
    amount: number;

    @Column({ name: 'origin_id' })
    originId: number;

    @ManyToOne(() => Origin, o => o.id)
    @JoinColumn({ name: 'origin_id' })
    origin: Origin;

    @Column({ name: 'transaction_type_id' })
    transactionTypeId: number;

    @ManyToOne(() => TransactionType, tt => tt.id)
    @JoinColumn({ name: 'transaction_type_id' })
    transactionType: TransactionType;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => User, u => u.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'status' })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;




}